import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const handleMount = useCallback(async () => {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        setTokenTimestamp(Date.now());
      } catch (err) {
        console.log(err);
      }
    }, []);

    useEffect(() => {
      handleMount();
    }, [handleMount]);

    const refreshTokenIfNeeded = useCallback(async () => {
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
      
      if (!tokenTimestamp || Date.now() > parseInt(tokenTimestamp) + twentyFourHoursInMs) {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          setTokenTimestamp(Date.now());
        } catch (error) {
          setCurrentUser(null);
          navigate("/login");
        }
      }
    }, [navigate]);

    const setTokenTimestamp = (timestamp) => {
      localStorage.setItem('tokenTimestamp', timestamp.toString());
    };

    useEffect(() => {
        const requestInterceptor = axiosReq.interceptors.request.use(
            async (config) => {
                await refreshTokenIfNeeded();
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        const responseInterceptor = axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                    await refreshTokenIfNeeded();
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosReq.interceptors.request.eject(requestInterceptor);
            axiosRes.interceptors.response.eject(responseInterceptor);
        };
    }, [refreshTokenIfNeeded]);

    return (
    <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
            {children}
        </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
    );
};
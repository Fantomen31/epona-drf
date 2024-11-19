import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { axiosRes } from '../api/axiosDefaults';

export const useRunupActions = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleHostRunup = useCallback(async (setShowModal) => {
    if (currentUser) {
      setShowModal(true);
    } else {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        setShowModal(true);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    }
  }, [currentUser, setCurrentUser, navigate]);

  const handleJoinRunup = useCallback(async (runupId) => {
    if (currentUser) {
      // TODO: Implement join runup API call
      console.log(`Joining runup with id: ${runupId}`);
    } else {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        // TODO: Implement join runup API call
        console.log(`Joining runup with id: ${runupId}`);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    }
  }, [currentUser, setCurrentUser, navigate]);

  return { handleHostRunup, handleJoinRunup };
};
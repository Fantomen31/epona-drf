import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { axiosRes } from '../api/axiosDefaults';

export const useAuthActions = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleHostRunup = useCallback(async () => {
    if (currentUser) {
      return true;
    } else {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        return true;
      } catch (err) {
        console.error('Error authenticating user:', err);
        navigate('/login');
        return false;
      }
    }
  }, [currentUser, setCurrentUser, navigate]);

  return { handleHostRunup };
};
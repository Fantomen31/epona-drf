import { useState, useEffect } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser?.profile_id) return;

      try {
        const { data } = await axiosReq.get(`/api/profiles/${currentUser.profile_id}/`);
        setUserProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  return { userProfile };
};
// hooks/useUserProfile.js
import { useState, useEffect, useCallback } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const currentUser = useCurrentUser();

  const fetchUserProfile = useCallback(async () => {
    if (!currentUser?.profile_id) return;

    try {
      const { data } = await axiosReq.get(`/api/profiles/${currentUser.profile_id}/`);
      setUserProfile(data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { userProfile, refreshUserProfile: fetchUserProfile };
};
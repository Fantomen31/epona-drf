import { useState, useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';

export const useProfileData = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/api/profiles/${currentUser?.pk}/`);
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile data');
        console.error(err);
      }
    };

    if (currentUser?.pk) {
      fetchProfile();
    }
  }, [currentUser]);

  return { profile, setProfile, error };
};

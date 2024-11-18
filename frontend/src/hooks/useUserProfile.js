import { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser?.profile_id) {
        console.log('No profile_id available, skipping profile fetch');
        return;
      }

      try {
        console.log('Fetching profile with ID:', currentUser.profile_id);
        const { data } = await axiosReq.get(`/api/profiles/${currentUser.profile_id}/`);
        console.log('Fetched profile data:', data);
        setUserProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile: ' + err.message);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  return { userProfile, error };
};

export default useUserProfile;
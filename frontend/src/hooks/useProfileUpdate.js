import { useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';

export const useProfileUpdate = (setProfile) => {
  const [updateError, setUpdateError] = useState(null);

  const updateProfile = async (profileData) => {
    try {
      const { data } = await axiosReq.put(`/api/profiles/${profileData.id}/`, profileData);
      setProfile(data);
      return true;
    } catch (err) {
      setUpdateError('Failed to update profile');
      console.error(err);
      return false;
    }
  };

  return { updateProfile, updateError };
};
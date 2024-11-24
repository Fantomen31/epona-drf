import { useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';

export const useProfileUpdate = () => {
  const [updateError, setUpdateError] = useState(null);

  const updateProfile = async (profileId, profileData) => {
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== null && profileData[key] !== undefined) {
          formData.append(key, profileData[key]);
        }
      });

      const { data } = await axiosReq.put(`/api/profiles/${profileId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return { success: true, data };
    } catch (err) {
      setUpdateError('Failed to update profile');
      console.error(err);
      return { success: false, error: err.response?.data };
    }
  };

  return { updateProfile, updateError };
};
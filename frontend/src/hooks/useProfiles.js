import useApi from './useApi';
import apiConfig from '../config/apiConfig';

const useProfiles = () => {
  const api = useApi();

  const getCurrentUserProfile = () => api.request(apiConfig.profiles.getCurrentUser);
  const getProfile = (id) => api.request(apiConfig.profiles.get(id));
  const updateProfile = (id, data) => api.request({ ...apiConfig.profiles.update(id), data });

  return {
    getCurrentUserProfile,
    getProfile,
    updateProfile,
    ...api
  };
};

export default useProfiles;
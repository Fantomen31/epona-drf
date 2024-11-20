import { useCallback } from 'react';
import { axiosReq } from '../api/axiosDefaults';

export const useRunupActions = (fetchRunups) => {
  const handleJoinLeaveRunup = useCallback(async (runupId, action) => {
    try {
      const { data } = await axiosReq.post(`/api/runups/${runupId}/${action}/`);
      console.log(`${action} runup response:`, data);
      await fetchRunups();
      return { success: true, message: `Successfully ${action}ed runup` };
    } catch (err) {
      console.error(`Error ${action}ing runup:`, err);
      return { success: false, message: `Failed to ${action} runup. Please try again.` };
    }
  }, [fetchRunups]);

  const handleDeleteRunup = useCallback(async (runupId) => {
    try {
      await axiosReq.delete(`/api/runups/${runupId}/`);
      console.log('Delete runup response: Success');
      await fetchRunups();
      return { success: true, message: 'Successfully deleted runup' };
    } catch (err) {
      console.error('Error deleting runup:', err);
      return { success: false, message: 'Failed to delete runup. Please try again.' };
    }
  }, [fetchRunups]);

  return { handleJoinLeaveRunup, handleDeleteRunup };
};
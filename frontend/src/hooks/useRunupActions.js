import { useCallback, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { useRunups } from './useRunups';

export const useRunupActions = () => {
  const { fetchRunups } = useRunups();
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleEditRunup = useCallback(async (runupId, updatedData) => {
    try {
      const { data } = await axiosReq.put(`/api/runups/${runupId}/`, updatedData);
      console.log('Edit runup response:', data);
      await fetchRunups();
      setShowEditModal(false);
      return { success: true, message: 'Successfully edited runup' };
    } catch (err) {
      console.error('Error editing runup:', err);
      return { success: false, message: 'Failed to edit runup. Please try again.' };
    }
  }, [fetchRunups]);

  const handleOpenEditModal = useCallback(() => {
    setShowEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
  }, []);

  return { 
    handleJoinLeaveRunup, 
    handleDeleteRunup, 
    handleEditRunup, 
    showEditModal, 
    handleOpenEditModal, 
    handleCloseEditModal 
  };
};
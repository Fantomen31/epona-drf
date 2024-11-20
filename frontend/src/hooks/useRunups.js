import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';

export const useRunups = () => {
  const [cities, setCities] = useState([]);
  const [runups, setRunups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();


  const fetchCities = useCallback(async () => {
    try {
      const { data } = await axiosReq.get('/api/cities/');
      if (data && Array.isArray(data.results)) {
        setCities(data.results);
      } else {
        console.error('Received unexpected data structure for cities:', data);
        setCities([]);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to fetch cities. Please try again later.');
    }
  }, []);

  const createRunup = useCallback(async (runupData) => {
    try {
      const { data } = await axiosReq.post('/api/runups/', runupData);
      setRunups(prevRunups => [data, ...prevRunups]);
      return { success: true, message: 'Runup created successfully!' };
    } catch (err) {
      console.error('Error creating runup:', err);
      let errorMessage = 'Failed to create runup. Please try again.';
      if (err.response && err.response.data) {
        errorMessage = Object.entries(err.response.data)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
      }
      return { success: false, message: errorMessage };
    }
  }, []);

  const fetchRunups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosReq.get('/api/runups/');
      if (data && Array.isArray(data.results)) {
        setRunups(data.results);
      } else {
        console.error('Received unexpected data structure for runups:', data);
        setRunups([]);
      }
    } catch (err) {
      console.error('Error fetching runups:', err);
      setError('Failed to fetch runups. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
    fetchRunups();
  }, [fetchCities, fetchRunups]);

  const handleJoinLeaveRunup = useCallback(async (runupId, action) => {
    if (currentUser) {
      try {
        await axiosReq.post(`/api/runups/${runupId}/${action}/`);
        await fetchRunups();
        return { success: true, message: `Successfully ${action}ed runup` };
      } catch (err) {
        console.error(`Error ${action}ing runup:`, err);
        return { success: false, message: `Failed to ${action} runup. Please try again.` };
      }
    } else {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        await axiosReq.post(`/api/runups/${runupId}/${action}/`);
        await fetchRunups();
        return { success: true, message: `Successfully ${action}ed runup` };
      } catch (err) {
        console.error('Error authenticating user:', err);
        navigate('/login');
        return { success: false, message: 'Please log in to join or leave runups.' };
      }
    }
  }, [currentUser, setCurrentUser, navigate, fetchRunups]);

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

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }, []);

  return { 
    cities, 
    runups, 
    loading, 
    error, 
    createRunup, 
    fetchRunups, 
    fetchCities, 
    handleJoinLeaveRunup, 
    handleHostRunup, 
    formatDate 
  };
};
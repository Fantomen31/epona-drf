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

  useEffect(() => {
    fetchCities();
  }, []);

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
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
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

  const handleJoinRunup = useCallback(async (runupId) => {
    if (currentUser) {
      // TODO: Implement join runup API call
      console.log(`Joining runup with id: ${runupId}`);
      await fetchRunups();
    } else {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        // TODO: Implement join runup API call
        console.log(`Joining runup with id: ${runupId}`);
        await fetchRunups();
      } catch (err) {
        console.error('Error authenticating user:', err);
        navigate('/login');
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
    handleJoinRunup, 
    handleHostRunup, 
    formatDate 
  };
};
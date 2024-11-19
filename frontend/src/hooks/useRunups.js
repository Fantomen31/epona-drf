import { useState, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefaults';

export const useRunups = () => {
  const [cities, setCities] = useState([]);
  const [runups, setRunups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return { cities, runups, loading, error, createRunup, fetchRunups, fetchCities };
};
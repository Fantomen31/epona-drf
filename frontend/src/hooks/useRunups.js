import { useState, useEffect, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefaults';

export const useRunups = () => {
  const [cities, setCities] = useState([]);
  const [runups, setRunups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCities = useCallback(async () => {
    try {
      const cachedCities = localStorage.getItem('cities');
      if (cachedCities) {
        setCities(JSON.parse(cachedCities));
        return;
      }

      const { data } = await axiosReq.get('/api/cities/');
      if (data && Array.isArray(data.results)) {
        setCities(data.results);
        localStorage.setItem('cities', JSON.stringify(data.results));
      } else {
        console.error('Received unexpected data structure for cities:', data);
        setCities([]);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to fetch cities. Please try again later.');
    }
  }, []);

  const fetchRunups = useCallback(async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchCities();
    fetchRunups();
  }, [fetchCities, fetchRunups]);

  return { cities, runups, error, loading, createRunup, fetchRunups };
};
import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(config);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};

export default useApi;
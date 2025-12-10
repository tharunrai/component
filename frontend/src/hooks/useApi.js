import { useState, useCallback } from 'react';
import api from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      
      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(url);
          break;
        case 'post':
          response = await api.post(url, data);
          break;
        case 'patch':
          response = await api.patch(url, data);
          break;
        case 'delete':
          response = await api.delete(url);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setLoading(false);
      return { data: response, error: null };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Request failed';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }
  }, []);

  const get = useCallback((url) => request('get', url), [request]);
  const post = useCallback((url, data) => request('post', url, data), [request]);
  const patch = useCallback((url, data) => request('patch', url, data), [request]);
  const del = useCallback((url) => request('delete', url), [request]);

  return {
    loading,
    error,
    request,
    get,
    post,
    patch,
    del,
  };
};

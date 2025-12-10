import { useEffect, useState } from 'react';
import { itemService } from '../services/itemService';

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await itemService.getItems();
        if (response.success) {
          setItems(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};

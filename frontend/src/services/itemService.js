import api from './api';

export const itemService = {
  // Get all items
  getItems: async () => {
    try {
      const response = await api.get('/items');
      return response;
    } catch (error) {
      throw error;
    }
  }
};

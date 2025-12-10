import api from './api';

export const personService = {
  // Add a person 
  addPerson: async (personData) => {
    try {
      const response = await api.post('/people', personData);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

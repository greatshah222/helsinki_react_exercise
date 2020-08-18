import axios from 'axios';

const baseUrl = 'http://localhost:5001/persons';

export const getAllNotes = async () => {
  return await axios.get(baseUrl);
};

export const createNote = async (data) => {
  return await axios.post(baseUrl, data);
};
export const updateNote = async (id, data) => {
  try {
    return await axios.patch(`${baseUrl}/${id}`, data);
  } catch (error) {
    throw error;
  }
};
export const deleteNote = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

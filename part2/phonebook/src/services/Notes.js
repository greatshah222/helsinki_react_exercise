import axios from 'axios';

const baseUrl = 'https://shielded-escarpment-66552.herokuapp.com/api/persons';

export const getAllNotes = async () => {
  const res = await axios.get(baseUrl);
  console.log(res);
  return res.data;
};

export const createNote = async (data) => {
  return await axios.post(baseUrl, data);
};
export const updateNote = async (id, data) => {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteNote = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

import axios from 'axios';

const baseUrl = 'https://shielded-escarpment-66552.herokuapp.com/api/persons';

export const getAllNotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data.data;
};

export const createNote = async (data) => {
  try {
    return await axios.post(baseUrl, data);
  } catch (error) {
    // console.log(error.response.data.error);
    throw error.response.data.error;
  }
};
export const updateNote = async (id, data) => {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, data);
    return res.data.data;
  } catch (error) {
    // console.log(error.response.data.error);
    throw error.response.data.error;
  }
};
export const deleteNote = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

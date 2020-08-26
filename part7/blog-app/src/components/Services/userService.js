import axios from 'axios';

const baseUrl = 'http://localhost:7000/api/users';
// if u want to use cookie u have to set withCredntial is true
export const login = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, data, {
      withCredentials: true,
    });
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error.response.data.error);
    throw error.response.data.error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(baseUrl);
    console.log(res);
    return res.data.data.doc;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const getSingleUsers = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`);
    console.log(res);
    return res.data.data.doc;
  } catch (error) {
    console.log(error);

    throw error.response.data.error;
  }
};
// always give withCredential is true when fetching the cookie
export const fetchTokenCookie = async () => {
  try {
    const res = await axios.get(`${baseUrl}/gettoken`, {
      withCredentials: true,
    });

    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error.response);
  }
};
export const logoutBackend = async () => {
  try {
    const res = await axios.get(`${baseUrl}/logout`, {
      withCredentials: true,
    });

    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error.response);
  }
};

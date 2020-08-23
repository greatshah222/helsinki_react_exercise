import axios from 'axios';

const baseUrl = 'http://localhost:7000/api/blogs';

export const getAllBlogs = async () => {
  const res = await axios.get(baseUrl);
  //   console.log(res);
  return res.data.data.doc;
};
export const createNewBlog = async (data) => {
  try {
    const res = await axios.post(baseUrl, data, { withCredentials: true });
    //   console.log(res);
    return res.data.data.doc;
  } catch (error) {
    console.log(error.response.data.data.error);
    throw error.response.data.data.error;
  }
};
export const updateSingleBlog = async (data, id) => {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, data, {
      withCredentials: true,
    });
    //   console.log(res);
    return res.data.data.doc;
  } catch (error) {
    console.log(error.response.data.data.error);
    throw error.response.data.data.error;
  }
};
export const deleteSingleBlog = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    //   console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error.response);
    throw error.response;
  }
};

import axios from 'axios';
const baseUrl = 'http://localhost:5001/anecdotes';

export const getAll = async () => {
  return await axios.get(baseUrl);
};
export const createSingleAnecdoteBackend = async (content) => {
  const data = {
    id: (100000 * Math.random()).toFixed(0),
    content,
    votes: 0,
  };
  const res = await axios.post(baseUrl, data);
  console.log(res);
  return res.data;
};
export const updateBlogBackEnd = async (id) => {
  const res1 = await axios.get(`${baseUrl}/${id}`);
  const oldVotes = res1.data.votes;
  const data = {
    votes: oldVotes + 1,
  };

  const res = await axios.patch(`${baseUrl}/${id}`, data);
  console.log(res.data);
  return res.data;
};

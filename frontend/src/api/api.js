import axios from 'axios';

export default loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/v1/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

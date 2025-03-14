import axios from 'axios';

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, credentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login', error);
  }
};

export default loginUser;

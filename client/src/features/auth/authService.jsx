import Cookies from 'js-cookie';
import api from '../../api/api';

const APIURL = '/auth';

const register = async (userData) => {
  const response = await api.post(`${APIURL}/register`, userData);
  return response?.data;
};
const login = async (credentials) => {
  const response = await api.post(`${APIURL}/login`, credentials, {
    withCredentials: true
  });

  if (response.data.accessToken) {
    console.log(response.data);
    Cookies.set('user', JSON.stringify({ accessToken: response.data.accessToken }));
  }
  return response?.data;
};
const logout = async () => {
  const response = await api.get(`${APIURL}/logout`, {
    withCredentials: true
  });
  Cookies.remove('user');

  return response?.data;
};

const authService = {
  register,
  login,
  logout
};

export default authService;

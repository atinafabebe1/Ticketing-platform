import api from '../../api/api';
import Cookies from 'js-cookie';

const APIURL = 'api/auth';

const register = async (userData) => {
  const response = await api.post(`${APIURL}/register`, userData);
  console.log(response);
  if (response.data) {
    Cookies.set('user', response.data.accessToken);
  }
  return response?.data;
};

const authService = {
  register
};

export default authService;

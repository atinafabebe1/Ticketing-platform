import api from '../../api/api';

const APIURL = '/auth';

const register = async (userData) => {
  const response = await api.post(`${APIURL}/register`, userData);
  return response?.data;
};

const authService = {
  register
};

export default authService;

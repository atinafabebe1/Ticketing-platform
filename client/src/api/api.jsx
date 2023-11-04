import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://ticketing-up1y.onrender.com/api'
});

// request interceptor to add the access token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('user');
    if (accessToken) {
      console.log('adding token');
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor to handle token expiration errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry && Cookies.get('user')) {
      console.log('access token expired');
      originalRequest._retry = true;
      try {
        const response = await api.get('/auth/refresh', {
          withCredentials: true
        });
        console.log(response);
        const { accessToken } = response.data;
        Cookies.set('user', accessToken);
        return api(originalRequest);
      } catch (error) {
        console.log('Error refreshing access token: ', error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

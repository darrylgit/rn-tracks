import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// ngrok http 3000
const instance = axios.create({
  baseURL: 'http://4fa728b28c47.ngrok.io'
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;

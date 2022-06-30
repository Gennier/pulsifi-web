import axios from 'axios';
import { getAccessToken } from './local-storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken() ? getAccessToken() : null}`,
  },
});

export default instance;

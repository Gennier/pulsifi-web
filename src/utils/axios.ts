import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api/',
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;

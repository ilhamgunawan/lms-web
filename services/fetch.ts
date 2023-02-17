import axios from 'axios';

const token = global.window ? window.localStorage.getItem('token') ?? '' : '';

const fetchClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  responseType: 'json',
  headers: {
    'Authorization': token,
    'Accept': '*/*',
  },
});

export { fetchClient };

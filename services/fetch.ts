import axios from 'axios';
import useStore from '../stores';

const token = useStore.getState().myAccount?.token ?? '';

const fetchClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  responseType: 'json',
  headers: {
    'Authorization': token,
    'Accept': '*/*',
  },
});

export { fetchClient };

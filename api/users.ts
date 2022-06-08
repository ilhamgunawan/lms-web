import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export function fetchUsers() {
  return axios({
    url: 'http://localhost:7002/users',
    method: 'get',
    withCredentials: true,
  });
}

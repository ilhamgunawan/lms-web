import axios, {AxiosResponse, AxiosError} from 'axios';
import { ErrorResponse } from './error';
import { useQuery } from 'react-query';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GetUserResponse {
  data: { users: Array<User> };
  message: string;
  status: string;
}

export function fetchUsers() {
  return axios({
    url: 'http://localhost:7002/api/v1/users',
    method: 'get',
    withCredentials: true,
  });
}

export function useGetUsers() {
  return useQuery<AxiosResponse<GetUserResponse>, AxiosError<ErrorResponse>>('users', fetchUsers, {
    retry: false,
  });
}

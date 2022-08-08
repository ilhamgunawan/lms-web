import axios, {AxiosPromise, AxiosResponse, AxiosError} from 'axios';
import { ErrorResponse } from './error';
import { useQuery, useMutation } from 'react-query';

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

export type CreateUserRequest = {
  name: string;
  email: string;
  role: string;
}

export type CreateUserResponse = {
  data: null;
  message: string;
  status: string;
}

type OnError = (error: AxiosError<ErrorResponse>) => void;

type OnSuccess = (res: AxiosResponse<CreateUserResponse>) => void;

export function createUser(req: CreateUserRequest): AxiosPromise<any> {
  return axios({
    url: 'http://localhost:7002/api/v1/users/create',
    method: 'post',
    withCredentials: true,
    data: { ...req },
  });
}

export function useCreateUser(onError?: OnError, onSuccess?: OnSuccess) {
  return useMutation(createUser, {
    onError: onError,
    onSuccess: onSuccess,
  });
}

export function deleteUser(userId: string) {
  return axios({
    url: `http://localhost:7002/api/v1/users/${userId}/delete`,
    method: 'delete',
    withCredentials: true,
  });
}

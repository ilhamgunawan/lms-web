import axios from 'axios';

export interface RoleUser {
  name: string;
  is_default: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    roles: Array<RoleUser>;
  }
}

export interface ValidateSessionResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface CurrentRoleResponse {
  role: 'admin' | 'teacher' | 'student';
}

export function fetchLogin(body: LoginRequest) {
  return axios({
    url: 'http://localhost:7002/api/v1/auth/login',
    method: 'post',
    withCredentials: true,
    data: body,
  });
}

export function fetchLogout() {
  return axios({
    url: 'http://localhost:7002/api/v1/auth/logout',
    method: 'delete',
    withCredentials: true,
  });
}

export function fetchValidateSession() {
  return axios({
    url: 'http://localhost:7002/api/v1/auth/session',
    method: 'get',
    withCredentials: true,
  });
}

export function fetchCurrentRole() {
  return axios({
    url: 'http://localhost:7002/api/v1/auth/role',
    method: 'get',
    withCredentials: true,
  });
}

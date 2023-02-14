import { fetchClient } from '../fetch';
import { PostLoginRequest, PostValidateTokenRequest } from '../../models/api/auth';

export const postLogin = async (req: PostLoginRequest) => {
  return fetchClient({
    method: 'post',
    url: '/api/v1/auth/login',
    data: req,
  });
}

export const postValidateToken = async (req: PostValidateTokenRequest) => {
  return fetchClient({
    method: 'post',
    url: '/api/v1/auth/validate',
    data: req,
  });
}

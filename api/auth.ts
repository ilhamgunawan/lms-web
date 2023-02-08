import axios from 'axios';

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export interface PostAuthLoginBody {
  user_name: string
  password: string
}

export async function postAuthLogin(body: PostAuthLoginBody) {
  return axios({
    url: `${endpoint}/api/v1/auth/login`,
    method: 'post',
    data: body,
  });
}

export interface PostAuthValidateTokenBody {
  token: string
}

export async function postAuthValidateToken(body: PostAuthValidateTokenBody) {
  return axios({
    url: `${endpoint}/api/v1/auth/validate`,
    method: 'post',
    data: body,
  });
}

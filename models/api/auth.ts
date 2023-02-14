export interface PostLoginRequest {
  user_name: string
  password: string
}

export interface PostLoginResponse {
  data: {
    user_name: string
    user_id: string
    first_name: string
    last_name: string
    gender: 'm' | 'f'
    date_of_birth: string
    token: string
  }
}

export interface PostValidateTokenRequest {
  token: string
}

export interface PostValidateTokenResponse {
  data: {
    token: any
  }
}

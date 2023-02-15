export interface GetUsersRequest {
  page: number
}

export interface GetUsersResponse {
  data: {
    users: User[]
    total_current: number
    total_all: number
    total_page: number
    limit: number
    offset: number
  }
}

export interface User {
  id: string
  first_name: string
  last_name: string
  gender: 'm' | 'f'
  date_of_birth: string
}

export interface CreateUserRequest {
  first_name: string
  last_name: string
  gender: string
  user_name: string
  password: string
  date_of_birth: string
}

export interface CreateUserData extends User {
  user_name: string
}

export interface CreateUserResponse {
  data: CreateUserData
}

export interface UpdateUserRequest extends User {}

export interface UpdateUserResponse {
  data: User
}

export interface DeleteUserRequest {
  id: string
}

export interface DeleteUserRespone {
  data: any
}

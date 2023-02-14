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

import { AxiosResponse } from "axios";
import { fetchClient } from "../fetch";
import { 
  CreateUserRequest,
  DeleteUserRequest,
  GetUsersRequest, 
  GetUsersResponse,
  UpdateUserRequest,
} from "../../models/api/users";

export const getUsers = async (req: GetUsersRequest): Promise<AxiosResponse<GetUsersResponse>> => {
  const limit = 10;
  const offset = (req.page - 1) * limit;

  return fetchClient({
    url: `/api/v1/users?limit=${limit}&offset=${offset}`,
    method: 'get',
  });
}

export const createUser = async (req: CreateUserRequest) => {
  return fetchClient({
    url: '/api/v1/users/create',
    method: 'post',
    data: req,
  });
}

export const updateUser = async (req: UpdateUserRequest) => {
  return fetchClient({
    url: `/api/v1/users/${req.id}/update`,
    method: 'put',
    data: req,
  });
}

export const deleteUser = async (req: DeleteUserRequest) => {
  return fetchClient({
    url: `/api/v1/users/${req.id}/delete`,
    method: 'delete',
    data: req,
  });
}

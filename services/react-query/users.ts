import { useQuery, useMutation } from "react-query";
import { getUsers, createUser, deleteUser, updateUser } from "../api/users";
import { QueryParams, MutationParams } from "../../models/react-query";
import { 
  GetUsersRequest, 
  GetUsersResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserRespone,
  UpdateUserRequest,
  UpdateUserResponse,
} from "../../models/api/users";

export const GetUsers = ({ 
  req, 
  onSuccess, 
  onError,
}: QueryParams<GetUsersRequest, GetUsersResponse>) => {
  const key = ['GetUsers', req?.page];
  return useQuery(key, () => getUsers({ page: req?.page ?? 1 }), {
    onError,
    onSuccess,
  });
}

export const CreateUser = ({ onError, onSuccess }: MutationParams<CreateUserRequest, CreateUserResponse>) => {
  return useMutation(createUser, {
    onError,
    onSuccess,
  });
}

export const UpdateUser = ({ onError, onSuccess }: MutationParams<UpdateUserRequest, UpdateUserResponse>) => {
  return useMutation(updateUser, {
    onError,
    onSuccess,
  });
}

export const DeleteUser = ({ onError, onSuccess }: MutationParams<DeleteUserRequest, DeleteUserRespone>) => {
  return useMutation(deleteUser, {
    onError,
    onSuccess,
  });
}
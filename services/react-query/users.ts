import { useQuery, useMutation } from "react-query";
import { getUsers, createUser } from "../api/users";
import { QueryParams, MutationParams } from "../../models/react-query";
import { 
  GetUsersRequest, 
  GetUsersResponse,
  CreateUserRequest,
  CreateUserResponse,
} from "../../models/api/users";

export const GetUsers = ({ 
  req, 
  onSuccess, 
  onError,
}: QueryParams<GetUsersRequest, GetUsersResponse>) => {
  const key = `GetUsers?page=${req?.page}`;
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

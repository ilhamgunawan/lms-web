import { useQuery } from "react-query";
import { getUsers } from "../api/users";
import { QueryParams } from "../../models/react-query";
import { GetUsersRequest, GetUsersResponse } from "../../models/api/users";

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

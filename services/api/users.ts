import { AxiosResponse } from "axios";
import { fetchClient } from "../fetch";
import { GetUsersRequest, GetUsersResponse } from "../../models/api/users";

export const getUsers = async (req: GetUsersRequest): Promise<AxiosResponse<GetUsersResponse>> => {
  const limit = 10;
  const offset = (req.page - 1) * limit;

  return fetchClient({
    url: `/api/v1/users?limit=${limit}&offset=${offset}`,
    method: 'get',
  });
}

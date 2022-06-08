import axios from 'axios';

export interface Menu {
  id: string;
  name: string;
  parent_id: string | null;
  path: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface FetchMenusResponse {
  menus: Array<Menu>;
}

export function fetchMenus() {
  return axios({
    url: 'http://localhost:7002/menus',
    method: 'get',
    withCredentials: true,
  });
}

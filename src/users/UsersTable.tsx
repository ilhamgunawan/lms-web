import { useRouter } from 'next/router';
import { GetUsersResponse } from '../../models/api/users';

import { Pagination, Paper, Table } from '@mantine/core';
import UsersTableItem from './UsersTableItem';

type Props = {
  page: number
  data: GetUsersResponse
}

export default function UsersTable({ page, data }: Props) {
  const router = useRouter();
  const columns = Object.keys(data.data.users[0]).filter(col => col !== 'id');

  return (
    <Paper shadow="sm" p="lg">
      <Table mb="md">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column}>{column.toUpperCase().replaceAll('_', ' ')}</th>
              )
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.data.users.map(user => 
            <UsersTableItem key={user.id} user={user} columns={columns} />
          )}
        </tbody>
      </Table>
      <Pagination
        page={page}
        total={data.data.total_page}
        onChange={(nextValue) => {
          router.push(`${router.route}?page=${nextValue}`);
        }}
      />
    </Paper>
  );
}

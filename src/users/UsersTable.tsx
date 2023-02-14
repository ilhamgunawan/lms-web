import { useRouter } from 'next/router';
import { Pagination, Paper, Table } from '@mantine/core';
import { GetUsersResponse } from '../../models/api/users';

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
          </tr>
        </thead>
        <tbody>{data.data.users.map(user => {
          const u = user as any;
          return (
            <tr key={user.id}>
              {columns.map((column) => {
                return (
                  <td key={`${user}_${column}`}>{u[column]}</td>
                )
              })}
            </tr>
          )
        })}</tbody>
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

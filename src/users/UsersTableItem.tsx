import dayjs from "dayjs";
import { User } from "../../models/api/users";
import UsersTableItemMenu from "./UsersTableItemMenu";

type Props = {
  user: User
  columns: string[]
}

export default function UsersTableItem({ user, columns }: Props) {
  const u = user as any;

  return (
    <tr>
      {columns.map((column) => {
        if (column === 'date_of_birth') {
          return (
            <td key={`${user}_${column}`}>{dayjs(u[column]).format('MMMM D, YYYY')}</td>
          )
        }
        if (column === 'gender') {
          return (
            <td key={`${user}_${column}`}>
              {u[column] === 'm' ? 'Male' : 'Female'}
            </td>
          )
        }
        return (
          <td key={`${user}_${column}`}>{u[column]}</td>
        )
      })}
      <td>
        <UsersTableItemMenu user={user} />
      </td>
    </tr>
  );
}

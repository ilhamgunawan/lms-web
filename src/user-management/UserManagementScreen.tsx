import { useGetUsers } from '../../api/users';
import GeneralErrorScreen from '../error/GeneralErrorScreen';
import UserTablePlaceHolder from './UserTablePlaceholder';
import UserTable from './UserTable';
import BreadCrumbComponent from '../breadcrumb/Breadcrumb';

export default function UserManagementScreen() {
  const {status, data: res, refetch} = useGetUsers();
  const users = res?.data.data.users;

  switch(status) {
    case 'idle':
      return <UserTablePlaceHolder />;
    case 'loading':
      return <UserTablePlaceHolder />;
    case 'success':
      return (
        <>
          <BreadCrumbComponent
            items={[
              {
                name: 'User Management',
                href: null,
              }
            ]}
          />
          <UserTable users={users ? users : []} />
        </>
      );
    case 'error':
      return <GeneralErrorScreen title="Something wen't wrong" body='Please try again' onRetry={refetch} />
    default:
      return <UserTablePlaceHolder />;
  }
}

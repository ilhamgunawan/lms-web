export default function UserManagementScreen() {
  return null
  // const {status, data: res, refetch} = useGetUsers();
  // const users = res?.data.data.users;

  // switch(status) {
  //   case 'idle':
  //     return <UserTablePlaceHolder />;
  //   case 'loading':
  //     return <UserTablePlaceHolder />;
  //   case 'success':
  //     return <UserTable users={users ? users : []} refetchUsers={refetch} />;
  //   case 'error':
  //     return <GeneralErrorScreen title="Something wen't wrong" body='Please try again' onRetry={refetch} />
  //   default:
  //     return <UserTablePlaceHolder />;
  // }
}

import UserForm from "./UserForm";
import BreadCrumbComponent from "../breadcrumb/Breadcrumb";

export default function CreateUserScreen() {
  return (
    <>
      <BreadCrumbComponent 
        items={[
          {
            name: 'User Management',
            href: '/user',
          },
          {
            name: 'Create User',
            href: null,
          }
        ]}
      />
      <UserForm />
    </>
  );
}

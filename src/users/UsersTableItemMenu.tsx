import { useState } from 'react';
import { ActionIcon, Menu, Modal } from '@mantine/core';
import { 
  IconEdit,
  IconSettings,
  IconTrash,
} from '@tabler/icons';
import { UpdateUserRequest } from '../../models/api/users';
import UpdateUserForm from './UpdateUserForm';

type Props = {
  user: UpdateUserRequest
}

export default function UsersTableItemMenu({ user }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="default"><IconSettings size={16} /></ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconEdit size={14} />} onClick={openEditModal}>Edit user</Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete user</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={showEditModal}
        onClose={closeEditModal}
        title="Edit User"
      >
        <UpdateUserForm user={user} closeModal={closeEditModal} />
      </Modal>
    </>
  );
}

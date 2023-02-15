import { useState } from 'react';
import { ActionIcon, Menu, Modal } from '@mantine/core';
import { 
  IconEdit,
  IconSettings,
  IconTrash,
} from '@tabler/icons';
import { UpdateUserRequest } from '../../models/api/users';
import UpdateUserForm from './UpdateUserForm';
import DeleteUserForm from './DeleteUserForm';

type Props = {
  user: UpdateUserRequest
}

export default function UsersTableItemMenu({ user }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="default"><IconSettings size={16} /></ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconEdit size={14} />} onClick={openEditModal}>Edit user</Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={openDeleteModal}>Delete user</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={showEditModal}
        onClose={closeEditModal}
        title="Edit User"
      >
        <UpdateUserForm user={user} closeModal={closeEditModal} />
      </Modal>
      <Modal
        opened={showDeleteModal}
        onClose={closeDeleteModal}
        title="Delete User"
      >
        <DeleteUserForm user={user} closeModal={closeDeleteModal} />
      </Modal>
    </>
  );
}

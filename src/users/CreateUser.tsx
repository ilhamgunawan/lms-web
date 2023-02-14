import { useState } from 'react';

import { Button, Modal } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';

import CreateUserForm from './CreateUserForm';

export default function CreateUser() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Button 
        leftIcon={<IconUserPlus size='16px' />} mb="sm"
        onClick={openModal}
      >
        Create User
      </Button>
      <Modal
        opened={showModal}
        onClose={closeModal}
        title="Create User"
      >
        <CreateUserForm closeModal={closeModal} />
      </Modal>
    </>
  );
}

import { Button, Group, Modal, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { useLogout } from "../../services/logout";

type Props = {
  showModal: boolean
  closeModal: () => void
}

export default function LogOutModal({ showModal, closeModal }: Props) {
  const { logout, isLoading } = useLogout();

  return (
    <Modal
      opened={showModal}
      onClose={closeModal}
      title="Log out Confirmation"
    >
      <Text color="dark" mb="md">
        Do you want to log out now?
      </Text>
      <Group position="right">
        <Button 
          type="button"
          disabled={isLoading}
          color="gray"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button 
          type="button" 
          loading={isLoading}
          onClick={logout}
          leftIcon={<IconLogout size="16px" />}
        >
          Log out
        </Button>
      </Group>
    </Modal>
  );
}

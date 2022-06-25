import { 
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Text,
} from '@chakra-ui/react';
import { PlusSquareIcon, EditIcon } from '@chakra-ui/icons';
import { User } from '../../api/users';
import Link from 'next/link';

interface Props {
  users: Array<User>;
}

export default function UserTable(props: Props) {
  return (
    <Box marginTop='4'>
      <Link href='/user/create' passHref>
        <Button 
          leftIcon={<PlusSquareIcon />} 
          colorScheme='blue' 
          marginBottom='4'
        >
          Create User
        </Button>
      </Link>
      <Box boxShadow='md' padding='2' bg='white' borderRadius='lg'>
        <TableContainer>
          <Table variant='simple' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.users.map(user => {
                return(
                  <Tr key={user.id}>
                    <Td><Text>{user.name}</Text></Td>
                    <Td><Text>{user.email}</Text></Td>
                    <Td>
                      <Link href={`/user/${user.id}/update`} passHref>
                        <Button variant='ghost'><EditIcon /></Button>
                      </Link>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

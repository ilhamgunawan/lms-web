import React, { 
  ReactNode, 
  useEffect,
  ReactText,
  useState,
  MouseEvent, 
} from 'react';
import { Config, getIcon } from '../../common/utils';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

export default function Sidebar({
  config,
  children,
}: {
  config: Config;
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        title={config.siteName}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent 
            title={config.siteName}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  title: string;
}

function getMenus(): Array<any> {
  if (window) {
    const menusJSON = window.localStorage.getItem('menus');
    const menus = menusJSON ? JSON.parse(menusJSON) : [];
    return menus;
  } else {
    return [];
  }
}

const SidebarContent = ({ title, onClose, ...rest }: SidebarProps) => {
  const [menus, setMenus] = useState<Array<any> | null>(null);

  useEffect(() => {
    setMenus(getMenus());
  }, []);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      boxShadow="sm"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {title}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {menus?.map((menu) => {
          return (
            <NavItem 
              key={menu.name}
              icon={getIcon(menu.name)}
              path={menu.path ? menu.path : ''}
            >
              {menu.name}
            </NavItem>
          )
        }
      )}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
}

const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === path;

  return (
    <NextLink href={path} passHref>
      <Link 
        color={isActive ? "black" : "blackAlpha.700"}
        fontWeight={isActive ? "bold" : "medium"}
        style={{ textDecoration: 'none' }} 
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          py="2"
          px="7"
          role="group"
          cursor="pointer"
          backgroundColor={isActive ? "blackAlpha.100" : "transparent"}
          style={{
            transition: '0.1s',
          }}
          _hover={{
            color: 'blackAlpha.900',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="3"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const router = useRouter();
  const toast = useToast();
  const userJSON = window.localStorage.getItem('user');
  const user = userJSON 
    ? JSON.parse(userJSON)
    : null
  ;

  // const logout = useMutation(fetchLogout, {
  //   onError: (error: AxiosError<any>, _variables, _context) => {
  //     toast({
  //       status: 'error',
  //       title: error.response?.data.message,
  //       position: 'top',
  //     });
  //   },
  //   onSuccess: (_res: AxiosResponse<LogoutResponse>, _variables, _context) => {
  //     window.localStorage.removeItem('menus');
  //     router.replace('/auth/login');
  //   },
  // });

  function handleLogout(_e: MouseEvent) {
    // logout.mutate();
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role.name}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

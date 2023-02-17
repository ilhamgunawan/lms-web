import { useState } from 'react';
import { createStyles, Navbar } from '@mantine/core';
import {
  IconBook,
  IconDashboard,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconUsers,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { useRouter } from 'next/router';
import appRoutes, { makeRouteNameFromPath } from '../../routes';
import LogOutModal from './LogOutModal';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },
  };
});

const data = [
  { link: appRoutes.dashboard.path, label: appRoutes.dashboard.name, icon: IconDashboard},
  { link: appRoutes.users.path, label: appRoutes.users.name, icon: IconUsers},
  { link: appRoutes.course.path, label: appRoutes.course.name, icon: IconBook },
  { link: appRoutes.settings.path, label: appRoutes.settings.name, icon: IconSettings },
];

export default function NavbarSimple() {
  const router = useRouter();
  const currentRouteName = makeRouteNameFromPath(router.route);

  const { classes, cx } = useStyles();
  const [active, setActive] = useState(currentRouteName);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a 
          href="#" 
          className={classes.link} 
          onClick={(event) => {
            event.preventDefault();
            openLogoutModal();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        <LogOutModal showModal={showLogoutModal} closeModal={closeLogoutModal} />
      </Navbar.Section>
    </Navbar>
  );
}

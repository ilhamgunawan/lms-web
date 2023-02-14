import { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import NavbarSimple from './Navbar';
import HeaderSimple from './Header';

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
      header={<HeaderSimple links={[]} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  );
}

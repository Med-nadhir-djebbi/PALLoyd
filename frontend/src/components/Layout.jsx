import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppShell, Burger, Group, NavLink, Text, Image, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LayoutDashboard, Users, Map, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo_palloyd.png';

const Layout = () => {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Tableau de Bord', icon: LayoutDashboard, path: '/' },
        { label: 'Clients', icon: Users, path: '/clients' },
        { label: 'RSE & Risques', icon: Map, path: '/rse' },
        { label: 'Administration', icon: Settings, path: '/admin' },
    ];

    return (
        <AppShell
            header={{ height: 80 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Image src={logo} h={60} w="auto" fit="contain" />
                    <Text fw={700} size="lg" c="lloydBlue">Palloyd Admin</Text>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" bg="lloydBlue.7">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        label={item.label}
                        leftSection={<item.icon size={20} strokeWidth={1.5} color="white" />}
                        active={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))}
                        onClick={() => {
                            navigate(item.path);
                            if (opened) toggle();
                        }}
                        variant="filled"
                        color="lloydBlue.9"
                        c="white"
                        mb={5}
                        style={{ borderRadius: '8px' }}
                    />
                ))}

                <div style={{ marginTop: 'auto' }}>
                    <NavLink
                        label="Déconnexion"
                        leftSection={<LogOut size={20} strokeWidth={1.5} color="white" />}
                        color="red"
                        variant="subtle"
                        c="white"
                        onClick={() => alert('Déconnexion...')}
                        style={{ borderRadius: '8px' }}
                    />
                </div>
            </AppShell.Navbar>

            <AppShell.Main bg="gray.0">
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;


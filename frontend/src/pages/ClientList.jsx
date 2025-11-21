import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Badge, Button, Group, Text, Paper, Title, Loader, Center, TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconEye } from '@tabler/icons-react';

const MOCK_CLIENTS = [
    { id: 1, full_name: 'Ahmed Ben Ali', cin: '08123456', score: 92, zone: 'Urbain', premium: 1200, status: 'Actif' },
    { id: 2, full_name: 'Sarra Mansour', cin: '09876543', score: 78, zone: 'Rural', premium: 850, status: 'En Attente' },
    { id: 3, full_name: 'Mohamed Tounsi', cin: '12345678', score: 45, zone: 'Urbain', premium: 1500, status: 'Suspendu' },
    { id: 4, full_name: 'Amel Jaziri', cin: '11223344', score: 88, zone: 'Mixte', premium: 1100, status: 'Actif' },
    { id: 5, full_name: 'Khaled Dridi', cin: '55667788', score: 65, zone: 'Rural', premium: 950, status: 'Retard' },
];

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setClients(MOCK_CLIENTS);
            setLoading(false);
        }, 800);
    }, []);

    const filteredClients = clients.filter(client =>
        client.full_name.toLowerCase().includes(search.toLowerCase()) ||
        client.cin.includes(search)
    );

    if (loading) return <Center h={400}><Loader size="xl" /></Center>;

    const rows = filteredClients.map((client) => (
        <Table.Tr key={client.id}>
            <Table.Td>{client.id}</Table.Td>
            <Table.Td>
                <Text fw={500}>{client.full_name}</Text>
            </Table.Td>
            <Table.Td>{client.cin}</Table.Td>
            <Table.Td>
                <Badge color={client.score >= 90 ? 'green' : client.score >= 70 ? 'blue' : 'orange'}>
                    {client.score}
                </Badge>
            </Table.Td>
            <Table.Td>{client.zone}</Table.Td>
            <Table.Td fw={700}>{client.premium} TND</Table.Td>
            <Table.Td>
                <Badge
                    variant="light"
                    color={
                        client.status === 'Actif' ? 'green' :
                            client.status === 'En Attente' ? 'yellow' :
                                client.status === 'Suspendu' ? 'red' : 'gray'
                    }
                >
                    {client.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Button
                    component={Link}
                    to={`/clients/${client.id}`}
                    size="xs"
                    variant="light"
                    color="lloydBlue"
                    leftSection={<IconEye size={14} />}
                >
                    Détails
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div>
            <Group justify="space-between" mb="lg">
                <Title order={2} c="lloydBlue">Liste des Assurés</Title>
                <TextInput
                    placeholder="Rechercher par nom ou CIN..."
                    leftSection={<IconSearch size={16} />}
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    style={{ width: 300 }}
                />
            </Group>

            <Paper shadow="sm" radius="md" withBorder>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Nom Complet</Table.Th>
                            <Table.Th>CIN</Table.Th>
                            <Table.Th>Score</Table.Th>
                            <Table.Th>Zone</Table.Th>
                            <Table.Th>Prime Annuelle</Table.Th>
                            <Table.Th>Statut</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                {filteredClients.length === 0 && (
                    <Center p="xl">
                        <Text c="dimmed">Aucun client trouvé.</Text>
                    </Center>
                )}
            </Paper>
        </div>
    );
};

export default ClientList;


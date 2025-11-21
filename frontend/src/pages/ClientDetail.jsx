import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { fetchUserDetails, fetchUserPayment, fetchAIComments } from '../services/api'; // API disabled
import { Grid, Card, Text, Badge, Group, Timeline, ThemeIcon, Button, Title, Paper, Loader, Center, List } from '@mantine/core';
import { IconUser, IconCreditCard, IconBrain, IconAlertTriangle, IconCheck, IconX, IconArrowLeft } from '@tabler/icons-react';

const MOCK_CLIENT_DETAIL = {
    id: 1,
    full_name: 'Ahmed Ben Ali',
    cin: '08123456',
    phone_number: '55123456',
    score: 92,
    zone: 'Urbain',
    subscription: {
        plan: 'Premium',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'Actif'
    },
    payment: {
        status: 'Payé',
        lastPaymentDate: '2024-01-01',
        amount: 1200
    },
    ai_analysis: {
        summary: "Conducteur très prudent avec une excellente anticipation. Quelques freinages brusques notés en zone urbaine dense.",
        behavior: [
            { type: 'positive', text: 'Respect constant des limitations de vitesse' },
            { type: 'positive', text: 'Conduite fluide sur autoroute' },
            { type: 'negative', text: 'Freinages tardifs aux intersections' }
        ],
        recommendation: "Eligible pour le bonus Gold. Suggérer le module de formation 'Anticipation Urbaine'."
    }
};

const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setClient(MOCK_CLIENT_DETAIL);
            setLoading(false);
        }, 600);
    }, [id]);

    if (loading) return <Center h={400}><Loader size="xl" /></Center>;
    if (!client) return <Center h={400}><Text>Client non trouvé</Text></Center>;

    return (
        <div>
            <Button
                component={Link}
                to="/clients"
                variant="subtle"
                color="gray"
                leftSection={<IconArrowLeft size={16} />}
                mb="md"
            >
                Retour à la liste
            </Button>

            <Group justify="space-between" mb="lg">
                <Title order={2} c="lloydBlue">{client.full_name}</Title>
                <Badge size="xl" color={client.score >= 90 ? 'green' : 'orange'}>Score: {client.score}</Badge>
            </Group>

            <Grid>
                {/* Left Column: Info & Subscription */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group>
                                <IconUser size={20} />
                                <Text fw={700}>Informations Personnelles</Text>
                            </Group>
                        </Card.Section>
                        <List spacing="xs" size="sm" mt="md" center>
                            <List.Item><strong>CIN:</strong> {client.cin}</List.Item>
                            <List.Item><strong>Téléphone:</strong> {client.phone_number}</List.Item>
                            <List.Item><strong>Zone:</strong> {client.zone}</List.Item>
                        </List>
                    </Card>

                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group>
                                <IconCreditCard size={20} />
                                <Text fw={700}>Abonnement & Paiement</Text>
                            </Group>
                        </Card.Section>
                        <List spacing="xs" size="sm" mt="md" center>
                            <List.Item><strong>Plan:</strong> {client.subscription.plan}</List.Item>
                            <List.Item><strong>Statut:</strong> <Badge color="green" size="sm">{client.subscription.status}</Badge></List.Item>
                            <List.Item><strong>Fin:</strong> {client.subscription.endDate}</List.Item>
                            <List.Item><strong>Dernier Paiement:</strong> {client.payment.amount} TND ({client.payment.status})</List.Item>
                        </List>
                    </Card>
                </Grid.Col>

                {/* Right Column: AI Analysis */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group>
                                <IconBrain size={20} color="purple" />
                                <Text fw={700} c="lloydBlue">Analyse IA & Comportement</Text>
                            </Group>
                        </Card.Section>

                        <Paper p="md" bg="blue.0" mt="md" radius="md">
                            <Text size="sm" fs="italic">"{client.ai_analysis.summary}"</Text>
                        </Paper>

                        <Title order={4} mt="lg" mb="md">Détails Comportementaux</Title>
                        <Timeline active={1} bulletSize={24} lineWidth={2}>
                            {client.ai_analysis.behavior.map((item, idx) => (
                                <Timeline.Item
                                    key={idx}
                                    bullet={item.type === 'positive' ? <IconCheck size={12} /> : <IconAlertTriangle size={12} />}
                                    color={item.type === 'positive' ? 'green' : 'orange'}
                                    title={item.type === 'positive' ? 'Point Fort' : 'Point d\'Attention'}
                                >
                                    <Text c="dimmed" size="sm">{item.text}</Text>
                                </Timeline.Item>
                            ))}
                        </Timeline>

                        <Paper p="md" withBorder mt="xl" radius="md" style={{ borderColor: '#D72924' }}>
                            <Text fw={700} c="lloydCrimson" mb="xs">Recommandation IA</Text>
                            <Text size="sm">{client.ai_analysis.recommendation}</Text>
                        </Paper>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default ClientDetail;

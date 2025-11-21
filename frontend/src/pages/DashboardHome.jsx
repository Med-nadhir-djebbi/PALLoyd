import React, { useEffect, useState } from 'react';
// import { fetchDashboardStats, fetchHeatmapData } from '../services/api'; // API disabled
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grid, Card, Text, RingProgress, Group, Paper, Title, Loader, Center, ThemeIcon, Progress } from '@mantine/core';
import { IconUsers, IconAlertTriangle, IconSteeringWheel, IconLeaf } from '@tabler/icons-react';

const MOCK_STATS = { total_users: 124, avg_score: 85, active_alerts: 3 };
const MOCK_HEATMAP = [
    { lat: 36.8065, lng: 10.1815, severity: 0.8, type: 'pothole' },
    { lat: 36.8100, lng: 10.1900, severity: 0.6, type: 'braking' },
    { lat: 36.8200, lng: 10.1700, severity: 0.9, type: 'accident' },
];
const MOCK_COMMUNITY_STATS = {
    avg_score: 78,
    eco_score: 88,
    incident_rate: 2.5
};

const DashboardHome = () => {
    const [stats, setStats] = useState({ total_users: 0, avg_score: 0, active_alerts: 0 });
    const [heatmapData, setHeatmapData] = useState([]);
    const [communityStats, setCommunityStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // Simulate API call
            setTimeout(() => {
                setStats(MOCK_STATS);
                setHeatmapData(MOCK_HEATMAP);
                setCommunityStats(MOCK_COMMUNITY_STATS);
                setLoading(false);
            }, 800);
        };
        loadData();
    }, []);

    if (loading) return <Center h={400}><Loader size="xl" /></Center>;

    return (
        <div>
            <Title order={2} mb="lg" c="lloydBlue">Vue d'ensemble</Title>

            {/* Top Stats Cards */}
            <Grid mb="lg">
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper p="md" radius="md" shadow="sm" withBorder>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Clients</Text>
                        <Text fw={700} size="xl" c="lloydCrimson" mt="sm" style={{ fontSize: '2rem' }}>
                            {stats.total_users}
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper p="md" radius="md" shadow="sm" withBorder>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Score Moyen Flotte</Text>
                        <Text fw={700} size="xl" c="green" mt="sm" style={{ fontSize: '2rem' }}>
                            {stats.avg_score}
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper p="md" radius="md" shadow="sm" withBorder>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Alertes Actives</Text>
                        <Text fw={700} size="xl" c="orange" mt="sm" style={{ fontSize: '2rem' }}>
                            {stats.active_alerts}
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid>
                {/* Heatmap Section */}
                <Grid.Col span={{ base: 12, lg: 8 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder h={500}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Text fw={700}>Carte des Risques</Text>
                        </Card.Section>
                        <Card.Section h="100%" mt="sm">
                            <MapContainer center={[36.8065, 10.1815]} zoom={13} style={{ height: '420px', width: '100%', borderRadius: '0.5rem' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {heatmapData.map((point, idx) => (
                                    <CircleMarker
                                        key={idx}
                                        center={[point.lat, point.lng]}
                                        radius={10}
                                        pathOptions={{ color: point.severity > 0.7 ? 'red' : 'orange', fillColor: point.severity > 0.7 ? 'red' : 'orange', fillOpacity: 0.6 }}
                                    >
                                        <Popup>
                                            Type: {point.type}<br />
                                            Sévérité: {point.severity}
                                        </Popup>
                                    </CircleMarker>
                                ))}
                            </MapContainer>
                        </Card.Section>
                    </Card>
                </Grid.Col>

                {/* Community Benchmarking Widget */}
                <Grid.Col span={{ base: 12, lg: 4 }}>
                    <Card shadow="sm" padding="xl" radius="md" withBorder style={{ background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)' }}>
                        <Card.Section withBorder inheritPadding py="md">
                            <Group justify="space-between">
                                <Group gap="xs">
                                    <ThemeIcon color="lloydBlue" variant="light" size="md" radius="md">
                                        <IconUsers size={18} />
                                    </ThemeIcon>
                                    <Text fw={700} c="lloydBlue" size="lg">Performance Flotte</Text>
                                </Group>
                                <Text size="xs" c="dimmed" fw={500}>vs Communauté</Text>
                            </Group>
                        </Card.Section>

                        <Group mt="xl" align="flex-start" justify="space-between">
                            <div>
                                <Text size="xs" c="dimmed" fw={600} tt="uppercase" ls={1}>Score de Sécurité</Text>
                                <Text fw={800} size="3rem" c="lloydBlue" lh={1} mt={4}>{stats.avg_score}</Text>
                                <Group gap={6} mt={4}>
                                    <ThemeIcon color="green" variant="transparent" size="sm">
                                        <IconSteeringWheel size={14} />
                                    </ThemeIcon>
                                    <Text size="sm" c="green" fw={600}>+{stats.avg_score - communityStats?.avg_score} pts</Text>
                                    <Text size="xs" c="dimmed">vs moyenne ({communityStats?.avg_score})</Text>
                                </Group>
                            </div>
                            <RingProgress
                                size={80}
                                roundCaps
                                thickness={6}
                                sections={[{ value: stats.avg_score, color: 'lloydBlue' }]}
                                label={
                                    <Center>
                                        <IconSteeringWheel size={24} color="#001B54" style={{ opacity: 0.5 }} />
                                    </Center>
                                }
                            />
                        </Group>

                        <Paper p="md" radius="md" mt="xl" style={{ backgroundColor: 'rgba(0, 27, 84, 0.03)' }}>
                            <Group mb="xs" justify="space-between">
                                <Group gap="xs">
                                    <IconLeaf size={16} color="#2f9e44" />
                                    <Text size="sm" fw={600} c="gray.7">Eco-Conduite</Text>
                                </Group>
                                <Text size="sm" fw={700} c="lloydBlue">92%</Text>
                            </Group>
                            <Progress
                                value={92}
                                color="green"
                                size="sm"
                                radius="xl"
                                mb="lg"
                                style={{ backgroundColor: 'rgba(47, 158, 68, 0.1)' }}
                            />

                            <Group mb="xs" justify="space-between">
                                <Group gap="xs">
                                    <IconAlertTriangle size={16} color="#f08c00" />
                                    <Text size="sm" fw={600} c="gray.7">Taux d'Incidents</Text>
                                </Group>
                                <Text size="sm" fw={700} c="lloydBlue">1.2%</Text>
                            </Group>
                            <Progress
                                value={15}
                                color="orange"
                                size="sm"
                                radius="xl"
                                style={{ backgroundColor: 'rgba(240, 140, 0, 0.1)' }}
                            />
                            <Text size="xs" c="dimmed" mt="xs" ta="right" fs="italic">Moyenne communauté: {communityStats?.incident_rate}%</Text>
                        </Paper>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default DashboardHome;

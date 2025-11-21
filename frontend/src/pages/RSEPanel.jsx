import React, { useState, useEffect } from 'react';
// import { fetchBlackSpots, sendInfrastructureReport } from '../services/api'; // API disabled
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grid, Card, Text, Button, Group, TextInput, Select, Textarea, Notification, Title, Badge, Loader, Center } from '@mantine/core';
import { IconAlertTriangle, IconMapPin, IconSend, IconCheck } from '@tabler/icons-react';

const MOCK_BLACKSPOTS = [
    { lat: 36.8065, lng: 10.1815, severity: 0.9, risk_score: 95, incidents: 12, type: 'Intersections Dangereuses' },
    { lat: 36.8150, lng: 10.1600, severity: 0.7, risk_score: 75, incidents: 5, type: 'Zone Scolaire' },
    { lat: 36.8300, lng: 10.2000, severity: 0.8, risk_score: 82, incidents: 8, type: 'Virage Serré' },
];

const MOCK_HAZARDS = [
    { id: 1, type: 'Nid de poule', location: 'Rue de la Liberté', severity: 'Moyenne', lat: 36.800, lng: 10.180 },
    { id: 2, type: 'Panneau manquant', location: 'Av. Habib Bourguiba', severity: 'Haute', lat: 36.802, lng: 10.182 },
    { id: 3, type: 'Eclairage défaillant', location: 'Route X', severity: 'Faible', lat: 36.805, lng: 10.185 },
];

const RSEPanel = () => {
    const [blackSpots, setBlackSpots] = useState([]);
    const [hazards, setHazards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportForm, setReportForm] = useState({ type: '', location: '', description: '' });
    const [sendingReport, setSendingReport] = useState(false);
    const [reportSent, setReportSent] = useState(false);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setBlackSpots(MOCK_BLACKSPOTS);
            setHazards(MOCK_HAZARDS);
            setLoading(false);
        }, 800);
    }, []);

    const handleReportSubmit = (e) => {
        e.preventDefault();
        setSendingReport(true);
        // Simulate API call
        setTimeout(() => {
            setSendingReport(false);
            setReportSent(true);
            setReportForm({ type: '', location: '', description: '' });
            setTimeout(() => setReportSent(false), 3000);
        }, 1500);
    };

    if (loading) return <Center h={400}><Loader size="xl" /></Center>;

    return (
        <div>
            <Title order={2} c="lloydBlue" mb="lg">Intelligence Routière & RSE</Title>

            <Grid>
                {/* Black Spot Analysis Map */}
                <Grid.Col span={{ base: 12, lg: 8 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder h={500}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group justify="space-between">
                                <Text fw={700}>Zones à Haut Risque (Black Spots)</Text>
                                <Badge color="red" variant="light">{blackSpots.length} Zones Identifiées</Badge>
                            </Group>
                        </Card.Section>
                        <Card.Section h="100%" mt="sm">
                            <MapContainer center={[36.8100, 10.1800]} zoom={12} style={{ height: '420px', width: '100%', borderRadius: '0.5rem' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {blackSpots.map((spot, idx) => (
                                    <CircleMarker
                                        key={idx}
                                        center={[spot.lat, spot.lng]}
                                        radius={15}
                                        pathOptions={{ color: 'red', fillColor: '#f03e3e', fillOpacity: 0.5 }}
                                    >
                                        <Popup>
                                            <Text fw={700}>{spot.type}</Text>
                                            <Text size="xs">Score Risque: {spot.risk_score}</Text>
                                            <Text size="xs">Incidents: {spot.incidents}</Text>
                                        </Popup>
                                    </CircleMarker>
                                ))}
                            </MapContainer>
                        </Card.Section>
                    </Card>
                </Grid.Col>

                {/* Infrastructure Reporting Form */}
                <Grid.Col span={{ base: 12, lg: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group>
                                <IconSend size={20} />
                                <Text fw={700}>Signalement aux Municipalités</Text>
                            </Group>
                        </Card.Section>

                        <form onSubmit={handleReportSubmit} style={{ marginTop: '1rem' }}>
                            <Select
                                label="Type d'Incident"
                                placeholder="Sélectionner..."
                                data={['Nid de poule', 'Panneau manquant', 'Eclairage défaillant', 'Marquage effacé']}
                                value={reportForm.type}
                                onChange={(val) => setReportForm({ ...reportForm, type: val })}
                                mb="sm"
                                required
                            />
                            <TextInput
                                label="Localisation"
                                placeholder="Adresse ou Coordonnées"
                                leftSection={<IconMapPin size={16} />}
                                value={reportForm.location}
                                onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                                mb="sm"
                                required
                            />
                            <Textarea
                                label="Description"
                                placeholder="Détails supplémentaires..."
                                value={reportForm.description}
                                onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                                mb="md"
                                minRows={3}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                color="lloydBlue"
                                loading={sendingReport}
                                leftSection={<IconSend size={16} />}
                            >
                                Générer & Envoyer Rapport
                            </Button>
                        </form>

                        {reportSent && (
                            <Notification icon={<IconCheck size={18} />} color="teal" title="Succès" mt="md" onClose={() => setReportSent(false)}>
                                Rapport envoyé aux services municipaux !
                            </Notification>
                        )}
                    </Card>

                    {/* Detected Hazards List */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group>
                                <IconAlertTriangle size={20} color="orange" />
                                <Text fw={700}>Dangers Détectés (Temps Réel)</Text>
                            </Group>
                        </Card.Section>
                        <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '1rem' }}>
                            {hazards.map((hazard) => (
                                <Group key={hazard.id} justify="space-between" mb="xs" p="xs" bg="gray.0" style={{ borderRadius: '4px' }}>
                                    <div>
                                        <Text size="sm" fw={500}>{hazard.type}</Text>
                                        <Text size="xs" c="dimmed">{hazard.location}</Text>
                                    </div>
                                    <Badge color={hazard.severity === 'Haute' ? 'red' : hazard.severity === 'Moyenne' ? 'orange' : 'yellow'} size="sm">
                                        {hazard.severity}
                                    </Badge>
                                </Group>
                            ))}
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default RSEPanel;

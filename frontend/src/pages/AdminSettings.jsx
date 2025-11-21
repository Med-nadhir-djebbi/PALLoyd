import React, { useState, useEffect } from 'react';
import { Grid, Card, Text, NumberInput, Button, Group, Title, Paper, Divider, Notification } from '@mantine/core';
import { IconDeviceFloppy, IconCheck } from '@tabler/icons-react';

const AdminSettings = () => {
    const [basePrice, setBasePrice] = useState(1000);
    const [categories, setCategories] = useState({
        gold: { minScore: 90, discount: 20 },
        silver: { minScore: 70, discount: 10 },
        bronze: { minScore: 0, discount: 0 },
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedBasePrice = localStorage.getItem('palloyd_basePrice');
        const storedCategories = localStorage.getItem('palloyd_categories');

        if (storedBasePrice) setBasePrice(parseInt(storedBasePrice));
        if (storedCategories) setCategories(JSON.parse(storedCategories));
    }, []);

    const handleSave = () => {
        localStorage.setItem('palloyd_basePrice', basePrice);
        localStorage.setItem('palloyd_categories', JSON.stringify(categories));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const updateCategory = (tier, field, value) => {
        setCategories(prev => ({
            ...prev,
            [tier]: { ...prev[tier], [field]: value }
        }));
    };

    return (
        <div>
            <Title order={2} c="lloydBlue" mb="lg">Configuration Admin</Title>

            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Text fw={700}>Prix de Base</Text>
                        </Card.Section>

                        <Paper p="md" bg="gray.0" mt="md">
                            <NumberInput
                                label="Prix de Base Annuel (TND)"
                                description="Le prix de référence avant application des réductions."
                                value={basePrice}
                                onChange={(val) => setBasePrice(val)}
                                min={0}
                                step={50}
                                allowNegative={false}
                            />
                        </Paper>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Text fw={700}>Catégories & Réductions</Text>
                        </Card.Section>

                        <div style={{ marginTop: '1rem' }}>
                            {/* Gold Category */}
                            <Paper p="sm" withBorder mb="sm" style={{ borderColor: '#FFD700', backgroundColor: '#FFFDF5' }}>
                                <Text fw={700} c="yellow.8" mb="xs">Catégorie Gold</Text>
                                <Group grow>
                                    <NumberInput
                                        label="Score Min."
                                        value={categories.gold.minScore}
                                        onChange={(val) => updateCategory('gold', 'minScore', val)}
                                        min={0} max={100}
                                    />
                                    <NumberInput
                                        label="Réduction (%)"
                                        value={categories.gold.discount}
                                        onChange={(val) => updateCategory('gold', 'discount', val)}
                                        min={0} max={100}
                                    />
                                </Group>
                            </Paper>

                            {/* Silver Category */}
                            <Paper p="sm" withBorder mb="sm" style={{ borderColor: '#C0C0C0', backgroundColor: '#F8F9FA' }}>
                                <Text fw={700} c="gray.7" mb="xs">Catégorie Silver</Text>
                                <Group grow>
                                    <NumberInput
                                        label="Score Min."
                                        value={categories.silver.minScore}
                                        onChange={(val) => updateCategory('silver', 'minScore', val)}
                                        min={0} max={100}
                                    />
                                    <NumberInput
                                        label="Réduction (%)"
                                        value={categories.silver.discount}
                                        onChange={(val) => updateCategory('silver', 'discount', val)}
                                        min={0} max={100}
                                    />
                                </Group>
                            </Paper>

                            {/* Bronze Category */}
                            <Paper p="sm" withBorder style={{ borderColor: '#CD7F32', backgroundColor: '#FFF5EE' }}>
                                <Text fw={700} c="orange.8" mb="xs">Catégorie Bronze</Text>
                                <Group grow>
                                    <NumberInput
                                        label="Score Min."
                                        value={categories.bronze.minScore}
                                        onChange={(val) => updateCategory('bronze', 'minScore', val)}
                                        min={0} max={100}
                                        disabled
                                    />
                                    <NumberInput
                                        label="Réduction (%)"
                                        value={categories.bronze.discount}
                                        onChange={(val) => updateCategory('bronze', 'discount', val)}
                                        min={0} max={100}
                                        disabled
                                    />
                                </Group>
                            </Paper>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>

            <Divider my="lg" />

            <Group justify="flex-end">
                <Button
                    size="md"
                    color="lloydBlue"
                    leftSection={<IconDeviceFloppy size={20} />}
                    onClick={handleSave}
                >
                    Enregistrer les Modifications
                </Button>
            </Group>

            {saved && (
                <Notification icon={<IconCheck size={18} />} color="teal" title="Succès" mt="md" onClose={() => setSaved(false)}>
                    Configuration enregistrée avec succès !
                </Notification>
            )}
        </div>
    );
};

export default AdminSettings;

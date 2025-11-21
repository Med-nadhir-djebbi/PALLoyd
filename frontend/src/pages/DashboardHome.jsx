import React, { useEffect, useState } from 'react';
import { fetchDashboardStats, fetchHeatmapData } from '../services/api';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DashboardHome = () => {
    const [stats, setStats] = useState({ total_users: 0, avg_score: 0, active_alerts: 0 });
    const [heatmapData, setHeatmapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statsData, heatmap] = await Promise.all([
                    fetchDashboardStats(),
                    fetchHeatmapData()
                ]);
                setStats(statsData);
                setHeatmapData(heatmap);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div className="p-8 text-center">Chargement du tableau de bord...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Vue d'ensemble</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
                    <p className="text-3xl font-bold text-lloyd-crimson mt-2">{stats.total_users}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Score Moyen</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.avg_score}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Alertes Actives</h3>
                    <p className="text-3xl font-bold text-orange-500 mt-2">{stats.active_alerts}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px]">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Carte des Risques</h3>
                <MapContainer center={[36.8065, 10.1815]} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}>
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
            </div>
        </div>
    );
};

export default DashboardHome;

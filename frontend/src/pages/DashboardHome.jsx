import React, { useEffect, useState } from 'react';
// import { fetchDashboardStats, fetchHeatmapData } from '../services/api'; // API disabled for now
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

    if (loading) return <div className="p-8 text-center">Chargement du tableau de bord...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Vue d'ensemble</h2>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
                    <p className="text-3xl font-bold text-lloyd-crimson mt-2">{stats.total_users}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Score Moyen Flotte</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.avg_score}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Alertes Actives</h3>
                    <p className="text-3xl font-bold text-orange-500 mt-2">{stats.active_alerts}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Heatmap Section - Spans 2 columns */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px]">
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

                {/* Community Benchmarking Widget - Spans 1 column */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-lloyd-blue mb-6">Comparaison Communautaire</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Score Sécurité</span>
                                <span className="text-sm font-medium text-gray-700">vs {communityStats.avg_score} (Moy.)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${stats.avg_score}%` }}></div>
                            </div>
                            <p className="text-xs text-green-600 mt-1 font-bold">+{stats.avg_score - communityStats.avg_score} pts au-dessus de la moyenne</p>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Eco-Conduite</span>
                                <span className="text-sm font-medium text-gray-700">vs {communityStats.eco_score} (Moy.)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <p className="text-xs text-blue-600 mt-1 font-bold">+4 pts au-dessus de la moyenne</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-2">Taux d'Incidents</h4>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-lloyd-crimson">1.2%</span>
                                <span className="text-sm text-gray-500 mb-1">vs {communityStats.incident_rate}% (Moy.)</span>
                            </div>
                            <p className="text-xs text-green-600 mt-2">Votre flotte est plus sûre que 85% de la communauté.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

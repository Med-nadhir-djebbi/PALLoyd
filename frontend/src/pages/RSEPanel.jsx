import React, { useEffect, useState } from 'react';
// import { fetchHeatmapData } from '../services/api'; // API disabled for now

const MOCK_HAZARDS = [
    { type: 'pothole', lat: 36.8065, lng: 10.1815, severity: 0.8, location: 'Rue de la République' },
    { type: 'braking', lat: 36.8100, lng: 10.1900, severity: 0.6, location: 'Avenue Habib Bourguiba' },
    { type: 'accident', lat: 36.8200, lng: 10.1700, severity: 0.9, location: 'Route X' },
    { type: 'pothole', lat: 36.8000, lng: 10.1600, severity: 0.4, location: 'Place Pasteur' },
];

const MOCK_BLACKSPOTS = [
    { name: 'Carrefour Route X', risk_score: 95, incidents: 12 },
    { name: 'Sortie Autoroute A1', risk_score: 88, incidents: 8 },
    { name: 'Rond-point Lac 2', risk_score: 72, incidents: 5 },
];

const RSEPanel = () => {
    const [hazards, setHazards] = useState([]);
    const [blackspots, setBlackspots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportStatus, setReportStatus] = useState(null);

    useEffect(() => {
        // Simulate API call
        const loadData = async () => {
            setTimeout(() => {
                setHazards(MOCK_HAZARDS);
                setBlackspots(MOCK_BLACKSPOTS);
                setLoading(false);
            }, 800);
        };
        loadData();
    }, []);

    const handleSendReport = () => {
        setReportStatus('sending');
        setTimeout(() => {
            setReportStatus('sent');
            alert("Rapport d'infrastructure généré et envoyé aux services municipaux !");
            setTimeout(() => setReportStatus(null), 3000);
        }, 1500);
    };

    if (loading) return <div className="p-8 text-center">Chargement des données RSE...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Initiatives RSE & Intelligence Collective</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Black Spots Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-lloyd-crimson mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-lloyd-crimson animate-pulse"></span>
                        Zones à Haut Risque (Black Spots)
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Zones identifiées par l'IA comme accidentogènes basées sur les données de la flotte.</p>
                    <div className="space-y-3">
                        {blackspots.map((spot, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                <div>
                                    <span className="font-bold text-gray-800">{spot.name}</span>
                                    <p className="text-xs text-red-600">{spot.incidents} incidents signalés</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-lloyd-crimson">{spot.risk_score}</span>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Score Risque</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Infrastructure Reporting Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Signalement aux Municipalités</h3>
                    <p className="text-gray-600 mb-6">
                        Générer et envoyer des rapports automatisés aux autorités locales concernant l'état des routes détecté par la flotte.
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h4 className="font-bold text-lloyd-blue">Rapport Mensuel Qualité Route</h4>
                            <p className="text-sm text-gray-500 mb-3">Inclut une carte thermique des nids-de-poule et incidents de freinage brusque.</p>
                            <button
                                onClick={handleSendReport}
                                disabled={reportStatus === 'sending'}
                                className={`w-full px-4 py-2 rounded-lg transition-colors font-medium ${reportStatus === 'sent'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-lloyd-crimson text-white hover:bg-red-700'
                                    }`}
                            >
                                {reportStatus === 'sending' ? 'Génération en cours...' :
                                    reportStatus === 'sent' ? 'Rapport Envoyé !' : 'Générer & Envoyer Rapport'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detected Hazards List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Derniers Dangers Détectés</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-gray-600">Type</th>
                                    <th className="px-4 py-2 text-gray-600">Lieu</th>
                                    <th className="px-4 py-2 text-gray-600">Sévérité</th>
                                    <th className="px-4 py-2 text-gray-600">Coordonnées</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {hazards.map((hazard, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 capitalize font-medium text-gray-800">{hazard.type}</td>
                                        <td className="px-4 py-3 text-gray-600">{hazard.location}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${hazard.severity > 0.7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {(hazard.severity * 100).toFixed(0)}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500">{hazard.lat}, {hazard.lng}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSEPanel;

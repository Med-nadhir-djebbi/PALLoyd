import React, { useEffect, useState } from 'react';
import { fetchHeatmapData } from '../services/api';

const RSEPanel = () => {
    const [hazards, setHazards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHazards = async () => {
            try {
                const data = await fetchHeatmapData();
                // Filter for hazards (assuming event_type 'pothole' or similar, for now just showing all events as hazards)
                setHazards(data);
            } catch (error) {
                console.error("Erreur lors du chargement des dangers:", error);
            } finally {
                setLoading(false);
            }
        };
        loadHazards();
    }, []);

    const handleSendReport = () => {
        alert("Rapport envoyé aux municipalités locales avec succès !");
    };

    if (loading) return <div className="p-8 text-center">Chargement des dangers...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Initiatives RSE & Signalement</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Dangers Routiers Détectés</h3>
                    <div className="overflow-y-auto h-96">
                        {hazards.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Aucun danger détecté pour le moment.</p>
                        ) : (
                            <ul className="space-y-3">
                                {hazards.map((hazard, idx) => (
                                    <li key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span className="font-bold text-gray-700 capitalize">{hazard.type}</span>
                                            <p className="text-xs text-gray-500">Lat: {hazard.lat}, Lng: {hazard.lng}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${hazard.severity > 0.7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            Sévérité: {hazard.severity}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Signalement aux Municipalités</h3>
                    <p className="text-gray-600 mb-6">
                        Générer et envoyer des rapports automatisés aux autorités locales concernant l'état des routes détecté par la flotte.
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-bold text-lloyd-blue">Rapport Mensuel Qualité Route</h4>
                            <p className="text-sm text-gray-500 mb-3">Inclut une carte thermique des nids-de-poule et incidents de freinage brusque.</p>
                            <button
                                onClick={handleSendReport}
                                className="w-full bg-lloyd-crimson text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Générer & Envoyer Rapport
                            </button>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg opacity-75">
                            <h4 className="font-bold text-gray-700">Alerte Danger Temps Réel</h4>
                            <p className="text-sm text-gray-500 mb-3">Notifier automatiquement les autorités des défaillances routières critiques.</p>
                            <button disabled className="w-full bg-gray-200 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                                Activé (Auto)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSEPanel;

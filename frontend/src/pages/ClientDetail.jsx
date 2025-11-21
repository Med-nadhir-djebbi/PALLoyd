import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { fetchUserDetails } from '../services/api'; // API disabled

const MOCK_DETAILS = {
    1: {
        user: { full_name: 'Ahmed Ben Ali', cin: '08123456', phone_number: '55123456', address: '15 Rue de la Liberté, Tunis' },
        score: { score: 92, safety_level: 'Excellent' },
        payment: { status: 'Payé', next_due: '2025-01-15', amount: 1200, currency: 'TND' },
        subscription: { start_date: '2024-01-15', end_date: '2025-01-15', plan: 'Tous Risques' },
        ai_comments: "Conducteur exemplaire. Respecte scrupuleusement les limitations de vitesse et maintient des distances de sécurité optimales. Aucune infraction majeure détectée ce mois-ci.",
        behavioral_details: [
            { label: 'Freinages Brusques', value: 'Rare', color: 'text-green-600' },
            { label: 'Excès de Vitesse', value: 'Aucun', color: 'text-green-600' },
            { label: 'Conduite Nocturne', value: 'Occasionnelle', color: 'text-yellow-600' },
            { label: 'Usage Téléphone', value: 'Jamais', color: 'text-green-600' },
        ]
    },
    2: {
        user: { full_name: 'Sarra Mansour', cin: '09876543', phone_number: '22987654', address: 'Route de Gremda, Sfax' },
        score: { score: 78, safety_level: 'Bon' },
        payment: { status: 'En Attente', next_due: '2024-12-01', amount: 850, currency: 'TND' },
        subscription: { start_date: '2023-12-01', end_date: '2024-12-01', plan: 'Tiers' },
        ai_comments: "Bonne conduite générale, mais tendance à accélérer brusquement aux feux rouges. Recommandation : Adopter une conduite plus souple pour économiser du carburant.",
        behavioral_details: [
            { label: 'Freinages Brusques', value: 'Parfois', color: 'text-yellow-600' },
            { label: 'Excès de Vitesse', value: 'Rare', color: 'text-green-600' },
            { label: 'Conduite Nocturne', value: 'Fréquente', color: 'text-orange-600' },
            { label: 'Usage Téléphone', value: 'Rare', color: 'text-green-600' },
        ]
    },
    // Default fallback for other IDs
    default: {
        user: { full_name: 'Client Inconnu', cin: '00000000', phone_number: '00000000', address: 'N/A' },
        score: { score: 0, safety_level: 'N/A' },
        payment: { status: 'N/A', next_due: 'N/A', amount: 0, currency: 'TND' },
        subscription: { start_date: 'N/A', end_date: 'N/A', plan: 'N/A' },
        ai_comments: "Pas de données suffisantes pour l'analyse.",
        behavioral_details: []
    }
};

const ClientDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            // Simulate API call
            setTimeout(() => {
                const details = MOCK_DETAILS[id] || MOCK_DETAILS.default;
                // If using default, override name for demo purposes if needed, or just keep as is
                if (!MOCK_DETAILS[id]) details.user.full_name = `Client #${id}`;
                setData(details);
                setLoading(false);
            }, 600);
        };
        loadDetails();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Chargement des détails...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Client introuvable</div>;

    const { user, score, payment, ai_comments, behavioral_details, subscription } = data;

    return (
        <div>
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Détails du Client: {user.full_name}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Info & Payment */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Informations Personnelles</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="text-gray-500">CIN:</span> {user.cin}</p>
                            <p><span className="text-gray-500">Tél:</span> {user.phone_number}</p>
                            <p><span className="text-gray-500">Adresse:</span> {user.address}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Abonnement & Paiement</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Plan</span>
                                <span className="font-bold text-lloyd-blue">{subscription.plan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Fin Abonnement</span>
                                <span className="text-gray-800">{subscription.end_date}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Statut Paiement</span>
                                    <span className={`font-bold ${payment.status === 'Payé' ? 'text-green-600' : 'text-orange-500'}`}>
                                        {payment.status}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-gray-500">Prochaine Échéance</span>
                                    <span className="text-gray-800">{payment.next_due}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle & Right Column: AI Analysis */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Analyse de Conduite IA</h3>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-lloyd-blue">{score.score}</span>
                                <p className="text-xs text-gray-500 uppercase">Score Global</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                            <h4 className="font-bold text-blue-800 mb-2 text-sm uppercase">L'avis de l'IA</h4>
                            <p className="text-blue-900 italic">"{ai_comments}"</p>
                        </div>

                        <h4 className="font-bold text-gray-700 mb-3">Détails Comportementaux</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {behavioral_details.map((detail, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">{detail.label}</span>
                                    <span className={`font-bold ${detail.color}`}>{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../services/api';

const ClientDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const details = await fetchUserDetails(id);
                setData(details);
            } catch (error) {
                console.error("Erreur lors du chargement des détails:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Chargement des détails...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Client introuvable</div>;

    const { user, score, payment, ai_comments } = data;

    return (
        <div>
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Détails du Client: {user.full_name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Informations de Paiement</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Statut</span>
                            <span className="text-green-600 font-bold">{payment.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Prochain Paiement</span>
                            <span className="text-gray-800">{payment.next_due}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Montant</span>
                            <span className="text-gray-800">{payment.amount} {payment.currency}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Analyse de Conduite IA</h3>
                    <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
                        "{ai_comments}"
                    </div>
                    {score && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Score Actuel</p>
                            <p className="text-2xl font-bold text-lloyd-blue">{score.score}</p>
                            <p className="text-xs text-gray-400">Niveau de Sécurité: {score.safety_level}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientDetail;

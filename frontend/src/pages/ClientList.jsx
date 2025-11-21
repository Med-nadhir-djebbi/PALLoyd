import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../services/api';

const ClientList = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClients = async () => {
            try {
                const data = await fetchUsers();
                setClients(data);
            } catch (error) {
                console.error("Erreur lors du chargement des clients:", error);
            } finally {
                setLoading(false);
            }
        };
        loadClients();
    }, []);

    if (loading) return <div className="p-8 text-center">Chargement des clients...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Gestion des Clients</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Nom</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Score</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Catégorie</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Statut</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {clients.map((client) => (
                            <tr
                                key={client.id}
                                onClick={() => navigate(`/clients/${client.id}`)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">{client.full_name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${client.score > 80 ? 'bg-green-100 text-green-700' :
                                        client.score > 50 ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {client.score}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{client.category}</td>
                                <td className="px-6 py-4 text-gray-600">{client.status}</td>
                                <td className="px-6 py-4 text-lloyd-crimson font-medium">Voir Détails</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientList;

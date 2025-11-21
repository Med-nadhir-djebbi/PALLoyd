import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { fetchUsers } from '../services/api'; // API disabled

const MOCK_CLIENTS = [
    { id: 1, full_name: 'Ahmed Ben Ali', cin: '08123456', phone_number: '55123456', score: 92, zone: 'Urbain' },
    { id: 2, full_name: 'Sarra Mansour', cin: '09876543', phone_number: '22987654', score: 78, zone: 'Rural' },
    { id: 3, full_name: 'Mohamed Trabelsi', cin: '11223344', phone_number: '98765432', score: 45, zone: 'Urbain' },
    { id: 4, full_name: 'Leila Khemiri', cin: '05556677', phone_number: '50112233', score: 88, zone: 'Mixte' },
    { id: 5, full_name: 'Youssef Gharbi', cin: '12345678', phone_number: '20334455', score: 65, zone: 'Rural' },
];

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState({
        basePrice: 1000,
        categories: {
            gold: { minScore: 90, discount: 20 },
            silver: { minScore: 70, discount: 10 },
            bronze: { minScore: 0, discount: 0 },
        }
    });

    useEffect(() => {
        // Load admin config
        const storedBasePrice = localStorage.getItem('palloyd_basePrice');
        const storedCategories = localStorage.getItem('palloyd_categories');

        if (storedBasePrice && storedCategories) {
            setConfig({
                basePrice: parseInt(storedBasePrice),
                categories: JSON.parse(storedCategories)
            });
        }

        // Simulate API call
        setTimeout(() => {
            setClients(MOCK_CLIENTS);
            setLoading(false);
        }, 600);
    }, []);

    const calculatePremium = (client) => {
        let category = 'Bronze';
        let discount = config.categories.bronze.discount;

        if (client.score >= config.categories.gold.minScore) {
            category = 'Gold';
            discount = config.categories.gold.discount;
        } else if (client.score >= config.categories.silver.minScore) {
            category = 'Silver';
            discount = config.categories.silver.discount;
        }

        // Zone modifier (Mock logic: Urban +10%, Rural -5%)
        let zoneMod = 0;
        if (client.zone === 'Urbain') zoneMod = 0.1;
        if (client.zone === 'Rural') zoneMod = -0.05;

        const baseWithZone = config.basePrice * (1 + zoneMod);
        const finalPrice = baseWithZone * (1 - discount / 100);

        return { category, finalPrice: Math.round(finalPrice), discount };
    };

    if (loading) return <div className="p-8 text-center">Chargement des clients...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-lloyd-blue">Liste des Clients</h2>
                <div className="text-sm text-gray-500">
                    Prix de base: <span className="font-bold text-gray-800">{config.basePrice} TND</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-gray-600 font-medium">Nom Complet</th>
                            <th className="px-6 py-4 text-gray-600 font-medium">CIN</th>
                            <th className="px-6 py-4 text-gray-600 font-medium">Score</th>
                            <th className="px-6 py-4 text-gray-600 font-medium">Zone</th>
                            <th className="px-6 py-4 text-gray-600 font-medium">Catégorie</th>
                            <th className="px-6 py-4 text-gray-600 font-medium">Prime Annuelle</th>
                            <th className="px-6 py-4 text-gray-600 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {clients.map((client) => {
                            const { category, finalPrice, discount } = calculatePremium(client);
                            return (
                                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{client.full_name}</td>
                                    <td className="px-6 py-4 text-gray-600">{client.cin}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${client.score >= 90 ? 'bg-green-100 text-green-700' :
                                                client.score >= 70 ? 'bg-blue-100 text-blue-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {client.score}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{client.zone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${category === 'Gold' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                category === 'Silver' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                                                    'bg-orange-50 text-orange-700 border-orange-200'
                                            }`}>
                                            {category} (-{discount}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-lloyd-blue">{finalPrice} TND</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/clients/${client.id}`} className="text-lloyd-crimson hover:text-red-800 font-medium text-sm">
                                            Détails
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientList;


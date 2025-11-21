import React, { useState, useEffect } from 'react';

const AdminSettings = () => {
    const [basePrice, setBasePrice] = useState(1000);
    const [categories, setCategories] = useState({
        gold: { minScore: 90, discount: 20 },
        silver: { minScore: 70, discount: 10 },
        bronze: { minScore: 0, discount: 0 },
    });

    useEffect(() => {
        // Load from localStorage or use defaults
        const storedBasePrice = localStorage.getItem('palloyd_basePrice');
        const storedCategories = localStorage.getItem('palloyd_categories');

        if (storedBasePrice) setBasePrice(parseInt(storedBasePrice));
        if (storedCategories) setCategories(JSON.parse(storedCategories));
    }, []);

    const handleSave = () => {
        localStorage.setItem('palloyd_basePrice', basePrice);
        localStorage.setItem('palloyd_categories', JSON.stringify(categories));
        alert('Configuration sauvegardée !');
    };

    const handleCategoryChange = (level, field, value) => {
        setCategories(prev => ({
            ...prev,
            [level]: { ...prev[level], [field]: parseInt(value) }
        }));
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-lloyd-blue mb-6">Administration & Configuration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pricing Configuration */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Configuration Tarifaire</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix de Base Annuel (TND)</label>
                        <input
                            type="number"
                            value={basePrice}
                            onChange={(e) => setBasePrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lloyd-blue focus:border-transparent"
                        />
                    </div>
                    <p className="text-sm text-gray-500">Ce prix servira de base pour le calcul des primes avant application des réductions basées sur le score.</p>
                </div>

                {/* Category Configuration */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Catégories & Réductions</h3>

                    <div className="space-y-4">
                        {/* Gold */}
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <h4 className="font-bold text-yellow-800 mb-2">Or (Gold)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600">Score Min.</label>
                                    <input
                                        type="number"
                                        value={categories.gold.minScore}
                                        onChange={(e) => handleCategoryChange('gold', 'minScore', e.target.value)}
                                        className="w-full p-1 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600">Réduction (%)</label>
                                    <input
                                        type="number"
                                        value={categories.gold.discount}
                                        onChange={(e) => handleCategoryChange('gold', 'discount', e.target.value)}
                                        className="w-full p-1 border rounded"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Silver */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-gray-700 mb-2">Argent (Silver)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600">Score Min.</label>
                                    <input
                                        type="number"
                                        value={categories.silver.minScore}
                                        onChange={(e) => handleCategoryChange('silver', 'minScore', e.target.value)}
                                        className="w-full p-1 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600">Réduction (%)</label>
                                    <input
                                        type="number"
                                        value={categories.silver.discount}
                                        onChange={(e) => handleCategoryChange('silver', 'discount', e.target.value)}
                                        className="w-full p-1 border rounded"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bronze */}
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <h4 className="font-bold text-orange-800 mb-2">Bronze</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600">Score Min.</label>
                                    <input
                                        type="number"
                                        value={categories.bronze.minScore}
                                        disabled
                                        className="w-full p-1 border rounded bg-gray-100 text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600">Réduction (%)</label>
                                    <input
                                        type="number"
                                        value={categories.bronze.discount}
                                        onChange={(e) => handleCategoryChange('bronze', 'discount', e.target.value)}
                                        className="w-full p-1 border rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-lloyd-crimson text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg"
                >
                    Sauvegarder la Configuration
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;

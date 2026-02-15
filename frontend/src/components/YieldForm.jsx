import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaSeedling, FaArrowRight } from 'react-icons/fa';

const YieldForm = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({ crop: 'Rice', area: 1 });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/advisory/yield', formData, {
                headers: { 'x-auth-token': token },
            });
            setPrediction(res.data.prediction);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">
            <div className="w-full max-w-xl p-8 bg-gradient-to-br from-white via-green-50 to-green-100 rounded-3xl shadow-2xl border border-green-200 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
                
                {/* Header */}
                <div className="flex items-center justify-center mb-8">
                    <FaSeedling className="text-green-500 text-3xl mr-3 animate-bounce" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-green-500 to-green-700 drop-shadow-lg animate-pulse">
                        Yield Prediction
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Crop */}
                        <div>
                            <label className="block text-sm md:text-base font-semibold text-green-700 mb-2">
                                Crop Name
                            </label>
                            <select
                                name="crop"
                                className="w-full border-2 border-green-300 rounded-xl px-4 py-3 text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                                value={formData.crop}
                                onChange={(e) =>
                                    setFormData({ ...formData, crop: e.target.value })
                                }
                            >
                                <option value="Rice">Rice</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Maize">Maize</option>
                            </select>
                        </div>

                        {/* Area */}
                        <div>
                            <label className="block text-sm md:text-base font-semibold text-green-700 mb-2">
                                Area (Hectares)
                            </label>
                            <input
                                type="number"
                                name="area"
                                value={formData.area}
                                onChange={(e) =>
                                    setFormData({ ...formData, area: e.target.value })
                                }
                                className="w-full border-2 border-green-300 rounded-xl px-4 py-3 text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3 text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Calculating...' : 'Predict Yield'}
                        {!loading && <FaArrowRight className="animate-pulse" />}
                    </button>
                </form>

                {/* Prediction Result */}
                {prediction && (
                    <div className="mt-8 p-5 bg-gradient-to-r from-green-100 via-green-50 to-green-200 border border-green-300 rounded-2xl text-center shadow-md transform transition duration-300 hover:scale-105">
                        <p className="text-sm md:text-base font-medium text-green-700 mb-1">
                            Estimated Yield:
                        </p>
                        <p className="text-3xl md:text-4xl font-extrabold text-green-800 drop-shadow-md animate-pulse">
                            {prediction}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YieldForm;

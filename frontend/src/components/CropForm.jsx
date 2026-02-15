import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FaLeaf, FaThermometerHalf, FaTint, FaCloudRain, FaFlask } from 'react-icons/fa';

const CropForm = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        N: user?.soilDetails?.N || 0,
        P: user?.soilDetails?.P || 0,
        K: user?.soilDetails?.K || 0,
        ph: user?.soilDetails?.ph || 7,
        temperature: 25,
        humidity: 50,
        rainfall: 100
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPrediction(null);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/advisory/crop', formData, {
                headers: { 'x-auth-token': token }
            });
            setPrediction(res.data.prediction);
        } catch (err) {
            setError('Failed to get recommendation. Ensure ML service is running.');
        }

        setLoading(false);
    };

    const fields = [
        { label: "Nitrogen (N)", name: "N", icon: <FaFlask /> },
        { label: "Phosphorus (P)", name: "P", icon: <FaFlask /> },
        { label: "Potassium (K)", name: "K", icon: <FaFlask /> },
        { label: "pH", name: "ph", step: "0.1", icon: <FaLeaf /> },
        { label: "Temperature (°C)", name: "temperature", icon: <FaThermometerHalf /> },
        { label: "Humidity (%)", name: "humidity", icon: <FaTint /> },
        { label: "Rainfall (mm)", name: "rainfall", icon: <FaCloudRain /> },
    ];

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center p-4 overflow-hidden">
            
            <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-auto transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                
                {/* Form Heading */}
                <h3 className="text-3xl font-bold mb-8 text-green-700 text-center">
                    🌱 {t('cropAdvisory')}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fields.map((field) => (
                            <div key={field.name} className="flex flex-col">
                                <label className="text-sm font-medium text-green-600 mb-1">{field.label}</label>
                                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 focus-within:border-transparent transition shadow-sm hover:shadow-md">
                                    <span className="text-green-400 mr-2">{field.icon}</span>
                                    <input
                                        type="number"
                                        name={field.name}
                                        step={field.step || "1"}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="w-full text-sm outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-300 disabled:opacity-50"
                    >
                        {loading ? t('loading') : "🌾 Get Recommendation"}
                    </button>
                </form>

                {/* Prediction Result */}
                {prediction && (
                    <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center shadow-md transition transform hover:scale-105">
                        <p className="text-3xl md:text-4xl font-bold text-green-900 mt-2 animate-pulse">
                            {prediction}
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default CropForm;

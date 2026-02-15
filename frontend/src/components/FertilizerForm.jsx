import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FaFlask } from 'react-icons/fa';

const FertilizerForm = () => {

  const { user } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    N: user?.soilDetails?.N || 0,
    P: user?.soilDetails?.P || 0,
    K: user?.soilDetails?.K || 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        '/api/advisory/fertilizer',
        formData,
        { headers: { 'x-auth-token': token } }
      );

      setPrediction(res.data.prediction);
    } catch (err) {
      setError(t('fertError') || 'Failed to get recommendation.');
    }

    setLoading(false);
  };

  return (
   <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center p-4">

    <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        {/* Heading */}
        <div className="flex items-center justify-center mb-8">
          <FaFlask className="text-amber-600 text-3xl mr-3 animate-bounce" />
          <h2 className="text-3xl font-bold text-green-700">
            {t('fertAdvisory')}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {['N', 'P', 'K'].map((nutrient) => (
              <div key={nutrient}>
                <label className="block text-sm font-medium text-green-600 mb-2">
                  {nutrient === 'N'
                    ? t('Nitrogen')
                    : nutrient === 'P'
                    ? t('Phosphorus')
                    : t('Potassium')}
                </label>

                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 transition shadow-sm hover:shadow-md">
                  <input
                    type="number"
                    name={nutrient}
                    value={formData[nutrient]}
                    onChange={handleChange}
                    className="w-full text-sm outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-300 disabled:opacity-50"
          >
            {loading ? t('loading') : t('Get Recommendation')}
          </button>

        </form>

        {/* Result */}
        {prediction && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center shadow-md transition transform hover:scale-105">
            <p className="text-3xl font-bold text-green-900 mt-2 animate-pulse">
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

export default FertilizerForm;

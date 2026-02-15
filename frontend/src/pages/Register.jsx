import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        soilDetails: { N: 0, P: 0, K: 0, ph: 7 }
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        if (['N', 'P', 'K', 'ph'].includes(e.target.name)) {
            setFormData({
                ...formData,
                soilDetails: { ...formData.soilDetails, [e.target.name]: parseFloat(e.target.value) }
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4">
            <div className="w-full max-w-3xl p-8 bg-gradient-to-br from-white via-green-50 to-green-100 rounded-3xl shadow-2xl border border-green-200 transform transition duration-500 hover:scale-105 hover:shadow-3xl">

                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-green-500 to-green-700 mb-6 animate-pulse">
                    Farmer Registration
                </h2>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-center mb-4 font-medium animate-pulse">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-green-700 font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-green-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                            />
                        </div>

                        {/* Password & Location */}
                        <div>
                            <label className="block text-green-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-green-700 font-semibold mb-2">Location (City)</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Delhi"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Soil Details */}
                    <div className="border-t pt-6">
                        <h3 className="text-green-700 font-semibold mb-4">Default Soil Details (Optional)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Nitrogen', 'Phosphorus', 'Potassium', 'ph'].map((field) => (
                                <div key={field}>
                                    <label className="block text-green-700 font-medium mb-1">
                                        {field === 'ph' ? 'pH Level' : field}
                                    </label>
                                    <input
                                        type="number"
                                        name={field}
                                        step={field === 'ph' ? "0.1" : "1"}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border-2 border-green-300 rounded-xl text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-green-700">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-green-600 hover:text-green-800 hover:underline transition-colors">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen w-full  flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4">
            <div className="w-full max-w-md p-8 bg-gradient-to-br from-white via-green-50 to-green-100 rounded-3xl shadow-2xl border border-green-200 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
                
                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-green-500 to-green-700 mb-6 animate-pulse">
                    Login
                </h2>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-center mb-4 font-medium animate-pulse">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-green-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-green-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-green-700">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-green-600 hover:text-green-800 hover:underline transition-colors">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

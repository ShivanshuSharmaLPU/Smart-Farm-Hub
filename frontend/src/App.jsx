import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import CropPage from "./pages/CropPage";
import FertilizerPage from "./pages/FertilizerPage";
import YieldPage from "./pages/YieldPage";
import DiseasePage from "./pages/DiseasePage";
import WeatherPage from "./pages/WeatherPage";





// ✅ NEW IMPORTS
import About from './pages/About';
import Contact from './pages/Contact';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />

                <div className="flex-grow container mx-auto px-4 py-8">
                    <Routes>

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Existing Private Dashboard */}
                        <Route path="/" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />

                        <Route path="/crop" element={
  <PrivateRoute>
    <CropPage />
  </PrivateRoute>
} />
<Route path="/fertilizer" element={<FertilizerPage />} />
<Route path="/yield" element={<YieldPage />} />
<Route path="/disease" element={<DiseasePage />} />
<Route path="/weather" element={<WeatherPage />} />





                        {/* ✅ NEW ROUTES (SAFE ADD) */}
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />

                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

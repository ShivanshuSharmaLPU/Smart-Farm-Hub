import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Leaf, Droplets, Thermometer, BarChart2, AlertCircle } from 'lucide-react';
import WeatherCard from '../components/WeatherCard.jsx'; // make sure the path is correct

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Dashboard cards with icons
  const dashboardItems = [
    { title: 'Crop Management', path: '/crop', icon: <Leaf size={28} className="text-green-600" /> },
    { title: 'Disease Alerts', path: '/disease', icon: <AlertCircle size={28} className="text-red-500" /> },
    { title: 'Fertilizer Guide', path: '/fertilizer', icon: <Droplets size={28} className="text-blue-500" /> },
    // { title: 'Weather Forecast', path: '/weather', icon: <Thermometer size={28} className="text-orange-500" /> },
    { title: 'Yield Insights', path: '/yield', icon: <BarChart2 size={28} className="text-purple-600" /> },
  ];

  return (
 <div className="pt-24 h-screen overflow-y-auto hide-scrollbar">


    <div className="space-y-12 p-6 max-w-[1400px] mx-auto">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left content */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
  Smart Farm Hub
</h1>

          <p className="text-green-100 text-lg md:text-xl font-medium">
            Hello, {user?.name}! Welcome to your Smart Farm.
          </p>
          <p className="text-green-100 mt-4 text-sm md:text-base max-w-xl">
            Track crop health, predict yields, monitor weather, and get actionable insights — all in one place. 
            Make smarter farming decisions and maximize productivity with AI-powered recommendations.
          </p>
        </div>

        {/* WeatherCard replacing image */}
        <WeatherCard location={user?.location || 'Delhi'} />

      </div>

     {/* Dashboard Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
  {dashboardItems.map((item, index) => (
    <div
      key={index}
      onClick={() => navigate(item.path)}
      className={`cursor-pointer p-8 rounded-2xl shadow-xl transform transition-all duration-500
                  flex flex-col items-start gap-5
                  hover:-translate-y-3 hover:shadow-2xl
                  group
                  ${
                    index % 4 === 0
                      ? 'bg-gradient-to-br from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700'
                      : index % 4 === 1
                      ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-900 hover:from-yellow-400 hover:to-yellow-600'
                      : index % 4 === 2
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700'
                      : 'bg-gradient-to-br from-purple-400 to-purple-600 text-white hover:from-purple-500 hover:to-purple-700'
                  }`}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl transition-transform duration-500 group-hover:animate-bounce">
          {item.icon}
        </div>
        <h2 className="text-3xl font-bold transition-colors duration-300 group-hover:text-yellow-200">
          {item.title}
        </h2>
      </div>
      {/* <p className="text-base opacity-90 transition-opacity duration-300 group-hover:opacity-100">
        Click to open {item.title}
      </p> */}
    </div>
  ))}
</div>


      {/* Footer */}
      <div className="text-center text-sm text-gray-400 mt-12">
        <p>🌾 Smart Crop Advisory System v1.0 • Offline Supported</p>
      </div>

    </div>
    </div>
  );
};

export default Dashboard;

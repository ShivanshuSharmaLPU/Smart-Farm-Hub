import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WeatherCard = ({ location }) => {
    const [weather, setWeather] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchWeather = async () => {
            if (!location) return;
            try {
                const res = await axios.get(`/api/weather/${location}`);
                setWeather(res.data);
            } catch (err) {
                console.error("Failed to fetch weather", err);
            }
        };
        fetchWeather();
    }, [location]);

    if (!weather)
        return (
            <div className="max-w-md w-full h-64 bg-gradient-to-br from-yellow-100 via-yellow-200 to-lime-100 rounded-3xl shadow-lg animate-pulse flex items-center justify-center text-white font-semibold">
                Loading Weather...
            </div>
        );

    return (
        <div className="max-w-md w-full p-8 bg-gradient-to-br from-yellow-300 via-yellow-300 to-lime-200 text-white rounded-3xl shadow-lg transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105">
            
            {/* Header: City & Description */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-3xl md:text-4xl font-extrabold drop-shadow-md">{weather.city}</h3>
                    <p className="capitalize opacity-90 text-lg md:text-base">{weather.description}</p>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    <img
                        src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                        alt="weather icon"
                        className="w-14 h-14 md:w-16 md:h-16"
                    />
                </div>
            </div>

            {/* Weather Stats */}
            <div className="mt-4 grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                    <Thermometer size={28} className="text-white/90" />
                    <div>
                        <span className="text-2xl md:text-3xl font-bold drop-shadow">{weather.temp}°C</span>
                        <p className="text-sm md:text-base opacity-80">{t('temperature')}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Droplets size={28} className="text-white/90" />
                    <div>
                        <span className="text-2xl md:text-3xl font-bold drop-shadow">{weather.humidity}%</span>
                        <p className="text-sm md:text-base opacity-80">{t('humidity')}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <Wind size={28} className="text-white/90" />
                    <div>
                        <span className="text-2xl md:text-3xl font-bold drop-shadow">{weather.wind} km/h</span>
                        <p className="text-sm md:text-base opacity-80">{t('wind')}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <CloudRain size={28} className="text-white/90" />
                    <div>
                        <span className="text-2xl md:text-3xl font-bold drop-shadow">{weather.rain || 0}%</span>
                        <p className="text-sm md:text-base opacity-80">{t('rain')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

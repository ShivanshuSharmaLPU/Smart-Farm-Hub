import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();

    const navLinkClass =
        "relative group font-semibold text-lg transition duration-300 hover:text-yellow-300";

    const underlineClass =
        "absolute left-0 -bottom-1 w-0 h-[3px] bg-yellow-300 transition-all duration-300 group-hover:w-full";

    return (
       <nav className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white shadow-xl backdrop-blur-sm fixed top-0 left-0 w-full z-50">

            <div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 text-3xl font-extrabold transform hover:scale-110 transition">
                    <Leaf size={32} className="text-yellow-400 animate-bounce" />
                    <span className="text-white drop-shadow-lg">{t('title')}</span>
                </Link>

                {/* Center Nav Links */}
                <div className="hidden md:flex items-center space-x-10">
                    <Link to="/" className={navLinkClass}>
                        Home
                        <span className={underlineClass}></span>
                    </Link>
                   
                    <Link to="/about" className={navLinkClass}>
                        About
                        <span className={underlineClass}></span>
                    </Link>
                    <Link to="/contact" className={navLinkClass}>
                        Contact
                        <span className={underlineClass}></span>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-5">

                    {/* Language Toggle */}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="bg-yellow-300 text-green-800 px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition hover:scale-105"
                    >
                        {language === 'en' ? 'हिंदी' : 'English'}
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-5">
                            <span className="hidden md:inline text-lg font-medium drop-shadow-md">
                                {t('welcome')}, {user.name}
                            </span>

                            <button
                                onClick={logout}
                                className="flex items-center space-x-2 hover:text-yellow-400 transition hover:scale-105 font-medium"
                            >
                                <LogOut size={20} />
                                <span className="hidden md:inline text-lg">{t('logout')}</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-lg font-medium hover:text-yellow-400 transition"
                            >
                                {t('login')}
                            </Link>

                            <Link
                                to="/register"
                                className="bg-yellow-400 text-green-900 px-5 py-2 rounded-xl hover:bg-yellow-300 transition font-bold text-lg hover:scale-105"
                            >
                                {t('register')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'

    const translations = {
        en: {
            title: "Smart Crop Advisory",
            login: "Login",
            register: "Register",
            dashboard: "Dashboard",
            weather: "Weather",
            cropAdvisory: "Crop Advisory",
            fertAdvisory: "Fertilizer Advisory",
            logout: "Logout",
            welcome: "Welcome",
            loading: "Loading..."
        },
        hi: {
            title: "स्मार्ट फसल सलाह",
            login: "लॉग इन",
            register: "पंजीकरण",
            dashboard: "डैशबोर्ड",
            weather: "मौसम",
            cropAdvisory: "फसल सलाह",
            fertAdvisory: "उर्वरक सलाह",
            logout: "लॉग आउट",
            welcome: "स्वागत है",
            loading: "लोड हो रहा है..."
        }
    };

    const t = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

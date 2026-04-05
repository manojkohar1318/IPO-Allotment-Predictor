"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('EN');
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSlug, setCurrentSlug] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    setIsDark(!isLight);
    if (isLight) {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 min-h-screen flex flex-col';
    } else {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-navy-950 text-white min-h-screen flex flex-col';
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-navy-950 text-white min-h-screen flex flex-col';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 min-h-screen flex flex-col';
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'EN' ? 'NP' : 'EN');
  };

  return (
    <AppContext.Provider value={{ 
      isDark, 
      setIsDark, 
      lang, 
      setLang, 
      toggleTheme, 
      toggleLang,
      currentPage,
      setCurrentPage,
      currentSlug,
      setCurrentSlug
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Bell,
  X,
  MessageCircle,
  Clock,
  AlertTriangle,
  Facebook,
  Twitter,
  Instagram,
  Mail
} from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Navbar } from './components/Navbar';
import { Predictor } from './components/Predictor';
import { EducationSection } from './components/EducationSection';
import { AboutSection } from './components/AboutSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { DisclaimerPage } from './components/DisclaimerPage';
import { cn } from './types';
import { DUMMY_IPOS } from './constants';

function AppContent() {
  const [lang, setLang] = useState('EN');
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [ipos, setIpos] = useState(DUMMY_IPOS);
  const [countdownData, setCountdownData] = useState({
    company: 'Sarbottam Cement',
    targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
  });
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const t = TRANSLATIONS[lang];

  // Check for hidden admin page via URL hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/adminpage-1318') {
        setCurrentPage('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-navy-950 text-white';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900';
    }
  }, [isDark]);

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(countdownData.targetDate) - +new Date();
      let timeLeft = { d: 0, h: 0, m: 0, s: 0 };

      if (difference > 0) {
        timeLeft = {
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60)
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [countdownData.targetDate]);

  const renderPage = () => {
    switch (currentPage) {
      case 'predictor': return <Predictor lang={lang} ipos={ipos} />;
      case 'education': return <EducationSection lang={lang} />;
      case 'about': return <AboutSection lang={lang} />;
      case 'admin': return <AdminDashboard lang={lang} ipos={ipos} setIpos={setIpos} countdownData={countdownData} setCountdownData={setCountdownData} />;
      case 'privacy': return <PrivacyPolicy lang={lang} />;
      case 'terms': return <TermsOfService lang={lang} />;
      case 'disclaimer': return <DisclaimerPage lang={lang} />;
      default: return renderHome();
    }
  };

  const renderHome = () => (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-500/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setCurrentPage('predictor')}
                className="btn-gold text-lg px-10 py-5 flex items-center gap-3 group"
              >
                {t.checkChances} <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={() => setCurrentPage('education')}
                className="px-10 py-5 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                Learn How It Works
              </button>
            </div>
          </motion.div>

          {/* Disclaimer Card */}
          <div className="mt-24 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-10 rounded-[2.5rem] border border-gold-500/20 bg-gold-500/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="w-24 h-24 text-gold-500" />
              </div>
              <div className="flex items-center gap-4 mb-6 justify-center">
                <div className="w-12 h-12 bg-gold-500/20 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="text-gold-500 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-gold-500 uppercase tracking-widest">Disclaimer</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed text-center italic">
                "{t.disclaimer}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">{t.howItWorks}</h2>
          <p className="text-slate-400">Simple 3-step process to find your allotment odds.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10" />
          
          {[
            { step: 1, title: t.step1, desc: 'Select your IPO and enter application details like number of accounts.', icon: '📝' },
            { step: 2, title: t.step2, desc: 'Our AI-powered algorithm analyzes historical trends and oversubscription data.', icon: '⚙️' },
            { step: 3, title: t.step3, desc: 'Get a detailed probability score and tips to improve your future chances.', icon: '📊' },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-6">
              <div className="w-20 h-20 bg-navy-800 rounded-3xl border border-white/10 flex items-center justify-center text-4xl mx-auto shadow-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Results */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass p-10 rounded-[3rem] border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <h2 className="text-3xl font-black">{t.recentResults}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ipos.slice(0, 6).map((ipo) => (
              <div key={ipo.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-navy-900 text-gold-400 border border-gold-500/30">
                    {ipo.type}
                  </span>
                  <span className="text-xs text-slate-500">{ipo.sector}</span>
                </div>
                <h3 className="font-bold text-lg mb-4">{lang === 'EN' ? ipo.name : ipo.nameNP}</h3>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Category</p>
                    <p className="font-bold text-xs">{ipo.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Price</p>
                    <p className="font-bold text-emerald-400">NPR {ipo.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Widget */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-10 rounded-[3rem] text-center shadow-2xl shadow-emerald-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Clock className="w-32 h-32" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Next Major IPO Result Countdown</h2>
          <p className="text-emerald-200 font-black text-3xl mb-8 uppercase tracking-wider">{countdownData.company}</p>
          <div className="flex justify-center gap-4 sm:gap-8">
            {[
              { label: 'Days', value: timeLeft.d },
              { label: 'Hours', value: timeLeft.h },
              { label: 'Mins', value: timeLeft.m },
              { label: 'Secs', value: timeLeft.s },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-70">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 font-bold text-emerald-100">Stay tuned for upcoming IPO results!</p>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-white transition-colors duration-300">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDark={isDark}
        setIsDark={setIsDark}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer lang={lang} setCurrentPage={setCurrentPage} />

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <a 
          href="https://wa.me/917080460057" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <MessageCircle className="text-white w-8 h-8" />
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

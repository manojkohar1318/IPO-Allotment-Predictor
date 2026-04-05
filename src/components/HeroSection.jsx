import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calculator, AlertTriangle } from 'lucide-react';
import { cn } from '../cn';
import { TRANSLATIONS } from '../constants';
import { useApp } from '../context/AppContext';

export const HeroSection = ({ setCurrentPage }) => {
  const { lang, isDark } = useApp();
  const t = TRANSLATIONS[lang];

  return (
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
          <h1 className={cn(
            "text-5xl md:text-7xl font-black mb-6 leading-tight",
            isDark ? "text-white" : "text-slate-900"
          )}>
            NEPSE IPO Allotment Predictor — Check Your IPO Chances
          </h1>
          <p className={cn(
            "text-xl md:text-2xl mb-10 max-w-3xl mx-auto",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>
            Welcome to the ultimate ipo allotment predictor nepal. Our advanced oversubscription checker helps you analyze any nepse ipo using data from mero share to calculate your exact allotment probability instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('predictor')}
              className="btn-gold text-lg px-10 py-5 flex items-center justify-center gap-3 group w-full sm:w-72"
            >
              {t.checkChances} <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => setCurrentPage('oversubscription')}
              className={cn(
                "px-10 py-5 rounded-xl font-bold border transition-all flex items-center justify-center gap-3 w-full sm:w-72",
                isDark ? "bg-indigo-600/20 border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-400" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-600"
              )}
            >
              <Calculator className="w-6 h-6" /> {t.oversubscriptionChecker}
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setCurrentPage('education')}
              className={cn(
                "px-8 py-3 rounded-xl font-bold border transition-all text-sm",
                isDark ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-900"
              )}
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
            <p className={cn(
              "text-lg leading-relaxed text-center italic",
              isDark ? "text-slate-300" : "text-slate-600"
            )}>
              "{t.disclaimer}"
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

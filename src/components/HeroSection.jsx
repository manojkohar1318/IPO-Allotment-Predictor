import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calculator, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '../cn';
import { TRANSLATIONS } from '../constants';
import { useApp } from '../context/AppContext';

export const HeroSection = ({ setCurrentPage }) => {
  const { lang, isDark } = useApp();
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-navy-950">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gold-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-gold-500/20 text-gold-500 text-xs font-black uppercase tracking-[0.3em] mb-8">
            <Sparkles size={14} /> Fintech Prediction Engine
          </div>
          
          <h1 className={cn(
            "text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter",
            isDark ? "text-white" : "text-slate-900"
          )}>
            NEPSE <span className="text-gold-500 italic">IPO</span><br />
            PREDICTOR
          </h1>
          <p className={cn(
            "text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium opacity-80",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>
            Nepal’s premier algorithmic companion for Mero Share and CDSC data. Analyze allotment probabilities with surgical precision using our deep-learning subscription models.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setCurrentPage('predictor')}
              className="btn-gold text-sm px-12 py-5 flex items-center justify-center gap-4 group w-full sm:w-auto min-w-[280px]"
            >
              Check My Chances <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => setCurrentPage('oversubscription')}
              className={cn(
                "px-12 py-5 rounded-2xl font-black uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-4 w-full sm:w-auto min-w-[280px] bg-white/5 hover:bg-white/10 text-white shadow-xl shadow-white/5",
              )}
            >
              <Calculator className="w-5 h-5" /> Live Records
            </button>
          </div>
          
          <div className="flex justify-center mt-8">
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

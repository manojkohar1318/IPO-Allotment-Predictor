"use client";

import React from 'react';
import { 
  TrendingUp, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { cn } from '../cn';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { lang, isDark, setCurrentPage } = useApp();
  const t = TRANSLATIONS[lang];

  return (
    <footer className={cn(
      "pt-20 pb-10 px-4 border-t transition-colors duration-300",
      "bg-navy-900 border-white/5"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg shadow-gold-500/20">
                <TrendingUp className="text-navy-950 w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  NEPSE <span className="text-gold-500">IPO</span>
                </span>
                <span className="text-[10px] font-bold text-gold-500/80 uppercase tracking-[0.2em]">Predictor Nepal</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              NEPSE’s premier algorithmic prediction engine for IPO allotments. We leverage historical subscription trends and CDSC data to provide the most accurate probability analysis in Nepal.
            </p>
          </div>

          {/* Navigation & Legal Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-gold-500 font-black text-xs uppercase tracking-[0.2em] mb-8">Platform</h4>
              <ul className="space-y-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'predictor', label: 'Check Allotment' },
                  { id: 'blog', label: 'IPO News' },
                  { id: 'education', label: 'Blog' }
                ].map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => setCurrentPage(link.id)}
                      className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-gold-500" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gold-500 font-black text-xs uppercase tracking-[0.2em] mb-8">Compliance</h4>
              <ul className="space-y-4">
                {[
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms & Conditions' },
                  { id: 'about', label: 'About Us' },
                  { id: 'contact', label: 'Contact Us' }
                ].map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => setCurrentPage(link.id)}
                      className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-gold-500" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-gold-500 font-black text-xs uppercase tracking-[0.2em] mb-8">Contact & Support</h4>
            <div className="glass p-6 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Support Email</span>
                  <span className="text-sm font-bold">earnrealcashnepal@gmail.com</span>
                </div>
              </div>
              <a 
                href="https://wa.me/9779804486318" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-gold w-full py-4 text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Message Us (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
              © 2026 NEPSE IPO Predictor. Deep Tech from Nepal.
            </p>
            <p className="text-[10px] text-slate-700 italic max-w-lg text-center md:text-left">
              Disclaimer: Results are probabilistic and non-binding. We are not an official CDSC affiliate.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="https://facebook.com" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 transition-all">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 transition-all">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 transition-all">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

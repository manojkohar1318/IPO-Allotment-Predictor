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

export const Footer = ({ lang, setCurrentPage }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-navy-800/50 border-t border-white/10 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                IPO <span className="text-emerald-500">Predictor</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              This website provides a fun and simple estimate of IPO allotment probability based on subscription data. 
              The results are approximate and for educational purposes only. Since the actual allotment process involves randomization, 
              real outcomes may differ. This is not financial advice.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/share/1BuKk986R6/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-white/10"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['home', 'predictor', 'education', 'about'].map((id) => (
                <li key={id}>
                  <button 
                    onClick={() => setCurrentPage(id)}
                    className="text-slate-400 hover:text-emerald-400 transition-colors capitalize"
                  >
                    {t[id]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>earnrealcashnepal@gmail.com</span>
              </li>
              <li>
                <a 
                  href="https://wa.me/917080460057" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © 2026 IPO Predictor Nepal. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition-colors">{t.privacyPolicy}</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-white transition-colors">{t.termsOfService}</button>
            <button onClick={() => setCurrentPage('disclaimer')} className="hover:text-white transition-colors">{t.disclaimerPage}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { 
  TrendingUp, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setCurrentPage }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-navy-800/50 border-t border-white/10 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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
              Nepal's most trusted data-driven IPO allotment prediction tool. 
              Helping 50,000+ investors make smarter decisions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all border border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['home', 'predictor', 'history', 'education', 'about'].map((id) => (
                <li key={id}>
                  <button 
                    onClick={() => setCurrentPage(id)}
                    className="text-slate-400 hover:text-emerald-400 transition-colors capitalize"
                  >
                    {t[id as keyof typeof t]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>New Baneshwor, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>+977 1-4455667</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>support@ipopredictor.com.np</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">IPO Alerts</h4>
            <p className="text-sm text-slate-400 mb-4">Join 50,000+ investors for real-time IPO alerts.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-navy-900 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © 2026 IPO Predictor Nepal. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

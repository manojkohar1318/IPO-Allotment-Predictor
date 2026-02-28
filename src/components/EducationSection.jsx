import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Lightbulb, 
  ShieldCheck, 
  TrendingUp,
  ChevronRight,
  PlayCircle,
  Facebook
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';

export const EducationSection = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const articles = [
    {
      title: lang === 'EN' ? 'IPO Allotment Process in Nepal' : 'नेपालमा IPO बाँडफाँड प्रक्रिया',
      desc: lang === 'EN' ? 'Understand how CDSC handles the lottery system.' : 'CDSC ले गोलाप्रथा प्रणाली कसरी सञ्चालन गर्छ बुझ्नुहोस्।',
      icon: BookOpen,
      color: 'text-blue-400'
    },
    {
      title: lang === 'EN' ? 'How to Increase Your Odds' : 'आफ्नो सम्भावना कसरी बढाउने',
      desc: lang === 'EN' ? 'Strategic tips for applying in the secondary market.' : 'दोस्रो बजारमा आवेदन दिनका लागि रणनीतिक सुझावहरू।',
      icon: Lightbulb,
      color: 'text-gold-400'
    },
    {
      title: lang === 'EN' ? 'Risk Management for Beginners' : 'सुरुवातकर्ताहरूको लागि जोखिम व्यवस्थापन',
      desc: lang === 'EN' ? 'Protect your capital while investing in IPOs.' : 'IPO मा लगानी गर्दा आफ्नो पूँजी सुरक्षित राख्नुहोस्।',
      icon: ShieldCheck,
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4">{t.education}</h1>
        <p className="text-slate-400">Master the art of IPO investing with our curated guides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {articles.map((article, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-[2.5rem] border border-white/10 group cursor-pointer"
          >
            <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${article.color}`}>
              <article.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">{article.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">{article.desc}</p>
            <button className="flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:gap-3 transition-all">
              Read More <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Facebook Section */}
      <div className="glass p-12 rounded-[3rem] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Facebook className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-grow space-y-6">
            <h2 className="text-3xl font-black">Get Latest Updates on FB</h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Stay updated with the latest IPO news, allotment results, and market analysis directly on our Facebook page. Join our community of 50,000+ investors!
            </p>
            <a 
              href="https://www.facebook.com/share/1BuKk986R6/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-gold px-8 py-4 inline-flex items-center gap-3"
            >
              <Facebook className="w-5 h-5" /> Visit Facebook Page
            </a>
          </div>
          <div className="w-full md:w-96 aspect-video bg-navy-900 rounded-2xl border border-white/10 flex items-center justify-center group cursor-pointer overflow-hidden">
            <img 
              src="https://picsum.photos/seed/finance/800/450" 
              alt="Facebook Community" 
              className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <Facebook className="text-white w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

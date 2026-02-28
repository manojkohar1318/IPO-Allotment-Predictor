import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Globe, 
  ShieldCheck, 
  Mail, 
  MessageCircle,
  TrendingUp,
  Info,
  Heart
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';

export const AboutSection = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Info className="w-4 h-4" /> {t.about}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Empowering Your <span className="text-emerald-500">Investment</span> Journey
          </h1>
          <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/10 max-w-4xl mx-auto text-left space-y-6">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Welcome to our IPO Allotment Probability website — a simple platform created to help investors understand their approximate chances of getting IPO shares.
            </p>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              We use publicly available subscription data to calculate and display estimated allotment probabilities in an easy and understandable format. Our goal is to make IPO data more transparent, engaging, and a little more fun for retail investors.
            </p>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Please note that the results shown here are only estimates. The actual IPO allotment process is conducted by official registrars using randomized methods, so final outcomes may vary.
            </p>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              This website is built purely for informational and educational purposes and does not provide financial or investment advice.
            </p>
            <p className="text-lg md:text-xl text-emerald-400 font-bold">
              Thank you for visiting and exploring IPO probabilities with us!
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: 'Transparency', 
            desc: 'We believe in making complex financial data accessible to everyone.', 
            icon: Target, 
            color: 'bg-emerald-500/20 text-emerald-500' 
          },
          { 
            title: 'Community', 
            desc: 'Building a supportive network for Nepali retail investors.', 
            icon: Heart, 
            color: 'bg-pink-500/20 text-pink-500' 
          },
          { 
            title: 'Accuracy', 
            desc: 'Using statistical models to provide the most realistic estimates.', 
            icon: ShieldCheck, 
            color: 'bg-gold-500/20 text-gold-500' 
          },
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-[2.5rem] border border-white/10 space-y-6"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-black">{t.contactUs}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Have questions or suggestions? We'd love to hear from you. Our team is dedicated to improving your investment journey.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Mail className="text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Email Support</p>
                <p className="text-lg font-bold">earnrealcashnepal@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center">
                <MessageCircle className="text-[#25D366] w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Direct Support</p>
                <a 
                  href="https://wa.me/917080460057" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform mt-2"
                >
                  <MessageCircle className="w-5 h-5" /> Message Us
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
              <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
              <input type="email" className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
            <textarea rows={4} className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
          </div>
          <button className="btn-gold w-full py-4 text-lg">Send Message</button>
        </div>
      </section>
    </div>
  );
};

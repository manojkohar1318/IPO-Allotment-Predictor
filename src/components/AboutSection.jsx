import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Phone,
  TrendingUp,
  Globe
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';

export const AboutSection = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
      {/* Mission & Vision */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-black mb-6">{t.about}</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Empowering Nepali investors with data-driven insights and statistical probability models for the NEPSE IPO market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16">
          {[
            { title: t.mission, desc: 'To democratize access to financial data for every retail investor in Nepal.', icon: Target, color: 'text-emerald-400' },
            { title: 'Our Vision', desc: 'To become the #1 platform for investment decision-making in the NEPSE ecosystem.', icon: Globe, color: 'text-blue-400' },
            { title: 'Trust & Security', desc: 'Your data privacy and accurate information are our top priorities.', icon: ShieldCheck, color: 'text-gold-400' },
          ].map((item, i) => (
            <div key={i} className="glass p-10 rounded-[2.5rem] border border-white/10 space-y-6">
              <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto ${item.color}`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-navy-800/50 border border-white/10 p-12 rounded-[4rem] text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Active Users', value: '50,000+' },
            { label: 'IPOs Analyzed', value: '500+' },
            { label: 'Accuracy Rate', value: '94%' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl font-black text-emerald-500">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
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
                <p className="text-lg font-bold">support@ipopredictor.com.np</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Our Office</p>
                <p className="text-lg font-bold">New Baneshwor, Kathmandu, Nepal</p>
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

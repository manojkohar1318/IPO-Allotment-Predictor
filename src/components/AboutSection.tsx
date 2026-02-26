import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  Shield, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { cn } from '../types';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { icon: Github, href: '#', color: 'hover:text-white' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Mission & Purpose */}
      <section className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-12 rounded-[3rem] border border-white/10"
        >
          <h2 className="text-4xl font-black mb-8 text-gradient">Our Mission & Purpose</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-10">
            NEPSE IPO Allotment Predictor is dedicated to empowering Nepali investors with data-driven insights. 
            Our primary purpose is to simplify the complex world of IPOs by providing a sophisticated tool that 
            estimates allotment probabilities based on historical trends and real-time market data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="text-emerald-500 w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Precision</h3>
              <p className="text-sm text-slate-400">Advanced algorithms for accurate probability estimation.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="text-gold-400 w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Community</h3>
              <p className="text-sm text-slate-400">Built for the growing community of Nepali retail investors.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Trust</h3>
              <p className="text-sm text-slate-400">Transparent data handling and objective analysis.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Detailed Description */}
      <section className="mb-20 space-y-12">
        <div className="prose prose-invert max-w-none">
          <h3 className="text-3xl font-bold mb-6">About the Website</h3>
          <p className="text-slate-300 text-lg leading-relaxed">
            In the rapidly evolving Nepali stock market, IPOs have become a gateway for many new investors. 
            However, with the massive surge in applicants, the allotment process has become a game of chance. 
            Our platform bridges the gap between raw data and actionable knowledge. By analyzing thousands of 
            past IPO results, we've developed a model that helps you understand your odds before you even apply.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            Whether you are a seasoned investor or just starting your journey with Mero Share, our predictor 
            provides a clear, visual representation of your chances. We also provide educational resources 
            to help you navigate the NEPSE landscape more effectively.
          </p>
        </div>
      </section>

      {/* Contact & Socials */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-10 rounded-[2.5rem] border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-8">Contact Details</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                <Mail className="text-emerald-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Email Us</p>
                <p className="font-medium">contact@nepseipo.com.np</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                <Phone className="text-gold-400 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Call Us</p>
                <p className="font-medium">+977 1-4000000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                <MapPin className="text-blue-400 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Visit Us</p>
                <p className="font-medium">New Baneshwor, Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-center items-center text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
          <p className="text-slate-400 mb-8">Follow us on social media for the latest IPO alerts and market updates.</p>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className={cn(
                  "w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/10",
                  social.color
                )}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

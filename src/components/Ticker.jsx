import React from 'react';
import { motion } from 'framer-motion';

export const Ticker = ({ ipos }) => {
  // Duplicate items for seamless loop
  const tickerItems = [...ipos, ...ipos];

  if (ipos.length === 0) return null;

  return (
    <div className="w-full bg-navy-800/50 border-y border-white/5 overflow-hidden py-2">
      <motion.div 
        className="flex whitespace-nowrap gap-8 items-center"
        animate={{ x: [0, -2000] }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {tickerItems.map((ipo, idx) => (
          <div key={`${ipo.id}-${idx}`} className="flex items-center gap-3 px-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ipo.type}</span>
            <span className="text-sm font-semibold text-white">{ipo.name}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              ipo.listingGain && ipo.listingGain > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {ipo.listingGain && ipo.listingGain > 0 ? '+' : ''}{ipo.listingGain || 0}%
            </span>
            <div className="w-1 h-1 rounded-full bg-white/20 ml-4" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

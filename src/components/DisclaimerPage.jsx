import React from 'react';
import { TRANSLATIONS } from '../constants';

import { cn } from '../types';

export const DisclaimerPage = ({ lang, isDark }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-8">
      <h1 className={cn("text-4xl font-black", isDark ? "text-white" : "text-slate-900")}>{t.disclaimerPage}</h1>
      <div className={cn(
        "max-w-none space-y-6",
        isDark ? "text-slate-400" : "text-slate-600"
      )}>
        <div className={cn(
          "p-8 border rounded-3xl",
          isDark ? "bg-gold-500/10 border-gold-500/20" : "bg-gold-50 border-gold-200"
        )}>
          <p className="text-gold-500 font-bold text-lg leading-relaxed italic text-center">
            "{t.disclaimer}"
          </p>
        </div>
        <p>The information provided by IPO Predictor Nepal is for general informational and educational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.</p>
        <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
        <p>The site cannot and does not contain financial advice. The financial information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>
      </div>
    </div>
  );
};

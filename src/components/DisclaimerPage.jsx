import React from 'react';
import { TRANSLATIONS } from '../constants';

export const DisclaimerPage = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-8">
      <h1 className="text-4xl font-black">{t.disclaimerPage}</h1>
      <div className="prose prose-invert max-w-none text-slate-400 space-y-6">
        <div className="p-8 bg-gold-500/10 border border-gold-500/20 rounded-3xl">
          <p className="text-gold-400 font-bold text-lg leading-relaxed italic">
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

import React from 'react';
import { TRANSLATIONS } from '../constants';

export const TermsOfService = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-8">
      <h1 className="text-4xl font-black">{t.termsOfService}</h1>
      <div className="prose prose-invert max-w-none text-slate-400 space-y-6">
        <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        <h2 className="text-2xl font-bold text-white">1. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on IPO Predictor Nepal's website for personal, non-commercial transitory viewing only.</p>
        <h2 className="text-2xl font-bold text-white">2. Disclaimer</h2>
        <p>The materials on IPO Predictor Nepal's website are provided "as is". IPO Predictor Nepal makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <h2 className="text-2xl font-bold text-white">3. Limitations</h2>
        <p>In no event shall IPO Predictor Nepal or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on IPO Predictor Nepal's Internet site.</p>
      </div>
    </div>
  );
};

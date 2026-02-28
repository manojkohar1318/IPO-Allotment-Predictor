import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Info,
  Users,
  Calculator,
  Share2,
  Download,
  Loader2,
  Facebook
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { cn } from '../types';
import ReactConfetti from 'react-confetti';
import html2canvas from 'html2canvas';

export const Predictor = ({ lang, ipos }) => {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);
  
  // Form State
  const [selectedIpoId, setSelectedIpoId] = useState('');
  const [oversubscription, setOversubscription] = useState('');
  const [accounts, setAccounts] = useState('1');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [kitta, setKitta] = useState('10');
  
  const [result, setResult] = useState(null);
  const t = TRANSLATIONS[lang];

  const selectedIpo = ipos.find(ipo => ipo.id === selectedIpoId);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('predictor_form');
    if (saved) {
      const data = JSON.parse(saved);
      setAccounts(data.accounts || '1');
      setKitta(data.kitta || '10');
      setIsFirstTime(data.isFirstTime || false);
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem('predictor_form', JSON.stringify({ accounts, kitta, isFirstTime }));
  }, [accounts, kitta, isFirstTime]);

  const handlePredict = () => {
    if (!selectedIpoId || !oversubscription) return;
    
    setLoading(true);
    
    // Simulate complex calculation
    setTimeout(() => {
      const oversub = parseFloat(oversubscription);
      const numAccounts = parseInt(accounts);
      
      // Basic probability logic: 1 / oversubscription per account
      const pPerAccount = Math.min(1, 1 / oversub);
      const totalProb = (1 - Math.pow(1 - pPerAccount, numAccounts)) * 100;
      
      let verdict = '';
      let color = '';
      let comment = '';
      
      if (totalProb > 80) {
        verdict = lang === 'EN' ? 'Extremely High Chance' : 'अत्यधिक उच्च सम्भावना';
        color = 'text-emerald-400';
        comment = t.funnyCommentHigh;
      } else if (totalProb > 50) {
        verdict = lang === 'EN' ? 'Good Chance' : 'राम्रो सम्भावना';
        color = 'text-emerald-500';
        comment = t.funnyCommentGood;
      } else if (totalProb > 20) {
        verdict = lang === 'EN' ? 'Moderate Chance' : 'मध्यम सम्भावना';
        color = 'text-gold-400';
        comment = t.funnyCommentMod;
      } else {
        verdict = lang === 'EN' ? 'Low Chance' : 'न्यून सम्भावना';
        color = 'text-red-400';
        comment = t.funnyCommentLow;
      }

      setResult({
        probability: Math.round(totalProb * 100) / 100,
        verdict,
        color,
        comment,
        companyName: lang === 'EN' ? selectedIpo.name : selectedIpo.nameNP,
        breakdown: [
          { label: lang === 'EN' ? 'Per Account Odds' : 'प्रति खाता सम्भावना', value: `${(pPerAccount * 100).toFixed(2)}%` },
          { label: lang === 'EN' ? 'Total Accounts' : 'कुल खाता संख्या', value: accounts },
          { label: lang === 'EN' ? 'Market Sentiment' : 'बजारको मनोविज्ञान', value: oversub > 50 ? 'Aggressive' : 'Neutral' }
        ]
      });
      
      setLoading(false);
      setStep('result');
    }, 1500);
  };

  const handleShare = async () => {
    const shareText = `My IPO Allotment Probability for ${result.companyName} is ${result.probability}%! ${result.comment} Check yours at IPO Predictor Nepal.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IPO Allotment Prediction',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to Facebook share
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
      window.open(fbUrl, '_blank');
    }
  };

  const handleDownload = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#020617', // navy-950
        scale: 2,
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          const buttons = clonedDoc.querySelector('.no-download');
          if (buttons) buttons.style.display = 'none';
        }
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `IPO_Prediction_${result.companyName.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (err) {
      console.error('Error downloading card:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {result && result.probability > 70 && step === 'result' && (
        <ReactConfetti recycle={false} numberOfPieces={200} gravity={0.1} />
      )}

      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black mb-4">{t.predictorTitle}</h1>
              <p className="text-slate-400">{t.predictorSub}</p>
            </div>

            <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Calculator className="w-32 h-32" />
              </div>

              <div className="space-y-8 relative z-10">
                {/* Company Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> {t.selectCompany}
                  </label>
                  <select 
                    value={selectedIpoId}
                    onChange={(e) => setSelectedIpoId(e.target.value)}
                    className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">-- {t.selectCompany} --</option>
                    {ipos.map(ipo => (
                      <option key={ipo.id} value={ipo.id}>
                        {lang === 'EN' ? ipo.name : ipo.nameNP} ({ipo.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Oversubscription */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Users className="w-4 h-4" /> Expected Oversubscription (Times)
                    </label>
                    <input 
                      type="number"
                      step="0.01"
                      placeholder="e.g. 15.5"
                      value={oversubscription}
                      onChange={(e) => setOversubscription(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>

                  {/* Number of Accounts */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Users className="w-4 h-4" /> No. of Accounts Applied From
                    </label>
                    <input 
                      type="number"
                      min="1"
                      value={accounts}
                      onChange={(e) => setAccounts(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Additional Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kitta (Units) Applied</label>
                    <input 
                      type="number"
                      step="10"
                      min="10"
                      value={kitta}
                      onChange={(e) => setKitta(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-4 h-full pt-6">
                    <button 
                      onClick={() => setIsFirstTime(!isFirstTime)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative",
                        isFirstTime ? "bg-emerald-500" : "bg-slate-700"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                        isFirstTime ? "left-7" : "left-1"
                      )} />
                    </button>
                    <span className="text-sm font-bold text-slate-300">First Time Applicant?</span>
                  </div>
                </div>

                <button 
                  onClick={handlePredict}
                  disabled={!selectedIpoId || !oversubscription || loading}
                  className="btn-gold w-full py-6 text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {lang === 'EN' ? 'Analyzing Market Data...' : 'बजार डाटा विश्लेषण गर्दै...'}
                    </>
                  ) : (
                    <>
                      {t.predictNow} <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[2.5rem] flex items-start gap-6">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Info className="text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-emerald-400">Pro Tip for Nepali Investors</h3>
                <p className="text-slate-400 leading-relaxed">
                  Applying for 10 units (kitta) from multiple family accounts is statistically more effective than applying for a large number of units from a single account in the current NEPSE lottery system.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <button 
              onClick={() => setStep('form')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold"
            >
              <ArrowLeft className="w-5 h-5" /> {t.backToForm}
            </button>

            <div ref={resultRef} className="glass p-10 md:p-16 rounded-[4rem] border border-white/10 text-center relative overflow-hidden">
              {/* Result Background Glow */}
              <div className={cn(
                "absolute inset-0 opacity-10 blur-[100px] -z-10",
                result?.color.includes('emerald') ? "bg-emerald-500" : "bg-gold-500"
              )} />

              <div className="space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <Calculator className="w-3.5 h-3.5" /> {t.resultFor} {result?.companyName}
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-400">
                    {lang === 'EN' ? 'Your Allotment Probability' : 'तपाईको बाँडफाँडको सम्भावना'}
                  </h2>
                  <div className={cn("text-8xl md:text-9xl font-black tracking-tighter", result?.color)}>
                    {result?.probability}%
                  </div>
                  <div className={cn("text-2xl md:text-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3", result?.color)}>
                    <CheckCircle2 className="w-8 h-8" /> {result?.verdict}
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-slate-300 italic">
                    "{result?.comment}"
                  </p>
                  <p className="text-gold-400 font-black text-lg uppercase tracking-widest">
                    {t.wish}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {result?.breakdown.map((item, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">{item.label}</p>
                      <p className="text-xl font-black">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 no-download">
                  <button 
                    onClick={handleShare}
                    className="btn-gold w-full sm:w-auto px-10 py-5 flex items-center justify-center gap-3"
                  >
                    <Share2 className="w-5 h-5" /> {t.shareResult}
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" /> {t.downloadCard}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gold-500/5 border border-gold-500/20 p-8 rounded-[2.5rem] flex items-start gap-6">
              <div className="w-12 h-12 bg-gold-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-gold-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gold-400">Important Note</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t.disclaimer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

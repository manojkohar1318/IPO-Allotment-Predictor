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
  Facebook,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { cn } from '../types';
import ReactConfetti from 'react-confetti';
import html2canvas from 'html2canvas';
import { db, ref, push, set, runTransaction } from '../firebase';
import { GoogleGenAI } from "@google/genai";

export const Predictor = ({ lang, ipos, isDark }) => {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
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

  // Sync oversubscription when selected IPO changes
  useEffect(() => {
    if (selectedIpo && selectedIpo.oversubscription) {
      setOversubscription(selectedIpo.oversubscription.toString());
    }
  }, [selectedIpo]);

  // Handle back button
  useEffect(() => {
    const handlePopState = (e) => {
      if (step === 'result') {
        setStep('form');
      }
    };

    if (step === 'result') {
      window.history.pushState({ step: 'result' }, '');
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step]);

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
          { label: lang === 'EN' ? 'Total Accounts' : 'कुल खाता संख्या', value: accounts }
        ]
      });

      // Firebase Integration
      try {
        const sentiment = oversub > 10 ? 'Bullish' : oversub > 5 ? 'Positive' : oversub > 2 ? 'Neutral' : 'Cautious';
        
        // A. Save prediction result
        const predictionsRef = ref(db, 'predictions');
        push(predictionsRef, {
          companyName: selectedIpo.name,
          totalAccounts: numAccounts,
          perAccountOdds: (pPerAccount * 100).toFixed(2) + '%',
          marketSentiment: sentiment,
          timestamp: Date.now()
        });

        // B. Update stats
        const statsRef = ref(db, 'stats');
        
        // Increment totalPredictions
        runTransaction(ref(db, 'stats/totalPredictions'), (currentValue) => {
          return (currentValue || 0) + 1;
        });

        // Increment companySearchCount
        const companyId = selectedIpo.name.replace(/\s+/g, '_').toLowerCase();
        runTransaction(ref(db, `stats/companySearchCount/${companyId}`), (currentValue) => {
          return (currentValue || 0) + 1;
        });
      } catch (fbError) {
        console.error('Firebase save failed:', fbError);
      }
      
      setLoading(false);
      setStep('result');
    }, 1500);
  };

  const handleShare = async () => {
    if (!resultRef.current || isSharing) return;
    
    setIsSharing(true);
    try {
      const element = resultRef.current;
      
      // Ensure the element is visible and scrolled into view for best capture
      element.scrollIntoView({ behavior: 'instant', block: 'center' });
      
      // Small delay to ensure scroll is finished
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(element, {
        backgroundColor: isDark ? '#020617' : '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        onclone: (clonedDoc) => {
          const buttons = clonedDoc.querySelector('.no-download');
          if (buttons) buttons.style.display = 'none';
          
          const card = clonedDoc.querySelector('#resultCard');
          if (card) {
            card.style.borderRadius = '24px';
            card.style.boxShadow = 'none';
            card.style.transform = 'none';
            card.style.margin = '0';
            card.style.padding = '40px';
          }
        }
      });
      
      if (!canvas) throw new Error('Canvas generation failed');

      const blob = await new Promise((resolve, reject) => {
        try {
          canvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error('Blob is null'));
          }, 'image/png', 0.9);
        } catch (e) {
          reject(e);
        }
      });

      const fileName = `IPO_Result_${result.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });
      
      const shareText = lang === 'EN' 
        ? `My IPO allotment probability for ${result.companyName} is ${result.probability}%!` 
        : `${result.companyName} को लागि मेरो IPO बाँडफाँड सम्भावना ${result.probability}% छ!`;

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'IPO Allotment Result',
            text: shareText
          });
        } catch (shareErr) {
          if (shareErr.name === 'AbortError') return;
          console.error('Navigator share failed:', shareErr);
          // Fallback to text share if file share fails
          await navigator.share({
            title: 'IPO Allotment Result',
            text: shareText,
            url: window.location.href
          });
        }
      } else if (navigator.share) {
        // Fallback to text sharing if file sharing is not supported
        await navigator.share({
          title: 'IPO Allotment Result',
          text: shareText,
          url: window.location.href
        });
      } else {
        // No navigator.share support, fallback to download
        await handleDownload();
      }
    } catch (err) {
      console.error('Share process failed:', err);
      if (err.name !== 'AbortError') {
        // Final fallback: try to download
        await handleDownload();
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = async () => {
    if (!resultRef.current || isDownloading || isGeneratingAI) return;
    
    setIsDownloading(true);
    setIsGeneratingAI(true);
    
    try {
      // 1. AI Image Generation (Task 4)
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate a professional, high-resolution (1024x1024) celebratory IPO allotment result card for a company named "${result.companyName}". 
      The card should clearly show a probability of ${result.probability}%. 
      Style: Modern, financial, clean, with emerald green and gold accents. 
      Theme: Success, investment growth, and financial prosperity. 
      The image should be artistic, high-quality, and suitable for sharing on social media as a "Prediction Success" card. 
      Include subtle Nepali cultural motifs or symbols of wealth like a "Kalash" or "Lotus" if appropriate, but keep it modern.`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          }
        }
      });

      let aiImageUrl = null;
      for (const part of aiResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          aiImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (aiImageUrl) {
        // Automatically download the AI generated image
        const link = document.createElement('a');
        link.href = aiImageUrl;
        link.download = `AI_IPO_Result_${result.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_1024x1024.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // 2. Standard Card Download (Existing functionality)
      const element = resultRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: isDark ? '#020617' : '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        onclone: (clonedDoc) => {
          const buttons = clonedDoc.querySelector('.no-download');
          if (buttons) buttons.style.display = 'none';
          
          const card = clonedDoc.querySelector('#resultCard');
          if (card) {
            card.style.borderRadius = '24px';
            card.style.boxShadow = 'none';
            card.style.transform = 'none';
          }
        }
      });
      
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `IPO_Result_${result.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Download/AI process failed:', err);
    } finally {
      setIsDownloading(false);
      setIsGeneratingAI(false);
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
              <h1 className={cn("text-4xl font-black mb-4", isDark ? "text-white" : "text-slate-900")}>{t.predictorTitle}</h1>
              <p className={isDark ? "text-slate-400" : "text-slate-500"}>{t.predictorSub}</p>
            </div>

            <div className={cn(
              "glass p-8 md:p-12 rounded-[3rem] border shadow-2xl relative overflow-hidden",
              isDark ? "border-white/10" : "border-slate-200 bg-white/50"
            )}>
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
                    className={cn(
                      "w-full border rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer",
                      isDark ? "bg-navy-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                    )}
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
                      className={cn(
                        "w-full border rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all",
                        isDark ? "bg-navy-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                      )}
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
                      className={cn(
                        "w-full border rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all",
                        isDark ? "bg-navy-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                      )}
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
                      className={cn(
                        "w-full border rounded-2xl p-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all",
                        isDark ? "bg-navy-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                      )}
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

            <div className={cn(
              "p-8 rounded-[2.5rem] flex items-start gap-6 border",
              isDark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"
            )}>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Info className="text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-emerald-500">Pro Tip for Nepali Investors</h3>
                <p className={cn("leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}>
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

            <div id="resultCard" ref={resultRef} className={cn(
              "p-10 md:p-16 rounded-[4rem] border text-center relative overflow-hidden",
              isDark ? "glass border-white/10" : "bg-white border-slate-200 shadow-xl"
            )}>
              {/* Result Background Glow */}
              <div className={cn(
                "absolute inset-0 opacity-10 blur-[100px] -z-10",
                result?.color.includes('emerald') ? "bg-emerald-500" : "bg-gold-500"
              )} />

              <div className="space-y-10">
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest",
                  isDark ? "bg-white/5 border-white/10 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-500"
                )}>
                  <Calculator className="w-3.5 h-3.5" /> {t.resultFor} {result?.companyName}
                </div>

                <div className="space-y-4">
                  <h2 className={cn("text-2xl md:text-3xl font-bold", isDark ? "text-slate-400" : "text-slate-500")}>
                    {lang === 'EN' ? 'Your Allotment Probability' : 'तपाईको बाँडफाँडको सम्भावना'}
                  </h2>
                  <div className={cn("text-4xl md:text-6xl font-black mb-6", result?.color)}>
                    {result?.companyName}
                  </div>
                  <div className={cn("text-8xl md:text-9xl font-black tracking-tighter", result?.color)}>
                    {result?.probability}%
                  </div>
                  <div className={cn("text-2xl md:text-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3", result?.color)}>
                    <CheckCircle2 className="w-8 h-8" /> {result?.verdict}
                  </div>
                  <p className={cn("text-xl md:text-2xl font-bold italic", isDark ? "text-slate-300" : "text-slate-700")}>
                    "{result?.comment}"
                  </p>
                  <p className="text-gold-500 font-black text-lg uppercase tracking-widest">
                    {t.wish}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result?.breakdown.map((item, i) => (
                    <div key={i} className={cn(
                      "p-6 rounded-3xl border",
                      isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    )}>
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">{item.label}</p>
                      <p className={cn("text-xl font-black", isDark ? "text-white" : "text-slate-900")}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 no-download">
                  <button 
                    onClick={handleShare}
                    disabled={isSharing}
                    className="btn-gold w-full sm:w-auto px-10 py-5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                    {isSharing ? (lang === 'EN' ? 'Processing...' : 'प्रक्रिया हुँदैछ...') : t.shareResult}
                  </button>
                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading || isGeneratingAI}
                    className={cn(
                      "w-full sm:w-auto px-10 py-5 rounded-2xl font-bold border transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
                      isDark ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-900"
                    )}
                  >
                    {isGeneratingAI ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {lang === 'EN' ? 'AI Generating...' : 'AI सिर्जना गर्दै...'}
                      </>
                    ) : isDownloading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {lang === 'EN' ? 'Processing...' : 'प्रक्रिया हुँदैछ...'}
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        {t.downloadCard}
                      </>
                    )}
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

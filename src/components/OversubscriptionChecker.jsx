import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calculator, Clock, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { cn } from '../cn';
import { fetchWithTimeout } from '../utils/api';
import { 
  firestore, 
  collection, 
  onSnapshot,
  handleFirestoreError,
  OperationType 
} from '../firebase';

export const OversubscriptionChecker = ({ lang, overSubData = [], isDark }) => {
  const [companies, setCompanies] = useState(overSubData);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (overSubData && overSubData.length > 0) {
      setCompanies(overSubData);
    }
  }, [overSubData]);

  const loadData = async () => {
    if (overSubData && overSubData.length > 0) return;
    setLoading(true);
    setError(null);
    
    try {
      // Fetch live data from CDSC scraper first
      const liveResponse = await fetchWithTimeout('/api/ipo-list', { timeout: 10000 });
      console.log("Response from /api/ipo-list (Checker):", liveResponse);
      if (liveResponse.ok) {
        const result = await liveResponse.json();
        console.log("Data from /api/ipo-list (Checker):", result);
        if (result.success && result.data && result.data.length > 0) {
          setCompanies(result.data);
          setLoading(false);
          return; // Use live data if available
        }
      }
      
      // Fallback to Firebase if live fetch fails or is empty
      const overSubCollection = collection(firestore, 'oversubscription');
      onSnapshot(overSubCollection, (snapshot) => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (list.length > 0) {
          setCompanies(list);
        } else {
          fetchFromAPI(); // Final fallback
        }
        setLoading(false);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'oversubscription');
        fetchFromAPI();
        setLoading(false);
      });
    } catch (err) {
      console.error("Error loading data:", err);
      fetchFromAPI();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchFromAPI = async () => {
    try {
      // Try our internal oversubscription API
      const response = await fetchWithTimeout('/api/ipo-oversubscription', { timeout: 8000 });
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        setError('Could not load IPO data. Please try again later.');
      }
    } catch (err) {
      setError('Could not load IPO data. Please try again later.');
    }
  };

  const handleCheck = () => {
    if (!selectedCompany) return;
    
    setResult({
      ratio: selectedCompany.oversubscription,
      issued: selectedCompany.issuedUnits.toLocaleString(),
      applied: selectedCompany.appliedUnits.toLocaleString(),
      lastUpdated: selectedCompany.lastUpdated ? new Date(selectedCompany.lastUpdated).toLocaleString() : new Date().toLocaleString(),
      percentage: Math.min((parseFloat(selectedCompany.oversubscription) / 20) * 100, 100) // Visual progress cap at 20x
    });
  };

  const handleRefresh = () => {
    setCompanies([]);
    setResult(null);
    setSelectedCompany(null);
    setSearchTerm('');
    loadData();
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDropdown = !selectedCompany && (searchTerm || companies.length > 0);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-navy-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-900 rounded-[3rem] shadow-2xl overflow-hidden border border-white/5"
        >
          <div className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-gold-500 rounded-[2rem] text-navy-950 shadow-lg shadow-gold-500/20">
                  <Calculator size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                      Oversubscription <span className="text-gold-500 italic">Live</span>
                    </h2>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full">
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-gold-500 uppercase tracking-widest leading-none">Sync</span>
                    </div>
                  </div>
                  <p className="text-slate-400 font-medium">Real-time data engine verified by NEPSE records</p>
                </div>
              </div>
              <button 
                onClick={handleRefresh}
                className="w-full md:w-auto px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest glass border-white/10 hover:bg-white/10"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                Refresh Data
              </button>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-[0.3em] ml-2 text-slate-500">
                  {t.selectCompany || 'Select Active IPO'}
                </label>
                <div className="relative group">
                  <select
                    className="w-full px-8 py-6 bg-navy-950 border-2 border-white/5 rounded-[2rem] focus:border-gold-500 outline-none transition-all text-xl font-black text-white appearance-none cursor-pointer"
                    value={selectedCompany?.id || ''}
                    onChange={(e) => {
                      const company = companies.find(c => c.id === e.target.value);
                      setSelectedCompany(company);
                      setResult(null);
                    }}
                    disabled={loading}
                  >
                    <option value="" disabled className="bg-navy-900 border-none font-bold">
                      {loading ? "FETCHING REAL-TIME DATA..." : "-- SOURCE: CDSC NEPAL --"}
                    </option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id} className="bg-navy-900 border-none font-bold">
                        {company.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-focus-within:text-gold-500 transition-colors">
                    <Search size={24} />
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={!selectedCompany || loading}
                className="btn-gold w-full py-6 text-xl tracking-[0.2em] flex items-center justify-center gap-4"
              >
                {loading ? <RefreshCw className="animate-spin" /> : <Calculator size={24} />}
                ANALYSIS RATIO
              </button>

            {error && (
              <div className="p-4 md:p-6 bg-red-500/5 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl md:rounded-[2rem] flex items-center gap-3 md:gap-4">
                <AlertCircle size={20} className="md:w-6 md:h-6" />
                <p className="text-xs md:text-base font-bold">{error}</p>
              </div>
            )}

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-16 p-8 md:p-16 bg-navy-950 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-2xl"
                >
                  {/* Decorative background element */}
                  <div className={cn(
                    "absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-20",
                    parseFloat(result.ratio) >= 1 ? "bg-gold-500" : "bg-red-500"
                  )} />

                  <div className="text-center mb-12 relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black mb-4 text-white">
                      {selectedCompany?.name}
                    </h3>
                    <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] font-black mb-10 text-slate-500">
                      Oversubscription Analysis Model
                    </p>
                    
                    <div className={cn(
                      "inline-flex flex-col items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full border-8 shadow-2xl mb-8 transition-all",
                      parseFloat(result.ratio) >= 1 
                        ? "bg-gold-500 border-gold-400/30 text-navy-950 shadow-gold-500/30 rotate-3" 
                        : "bg-red-500 border-red-400/30 text-white shadow-red-500/30 -rotate-3"
                    )}>
                      <span className="text-5xl md:text-7xl font-black leading-none">{result.ratio}x</span>
                      <span className="text-xs font-black uppercase tracking-widest mt-2">{parseFloat(result.ratio) >= 1 ? 'Surplus' : 'Deficit'}</span>
                    </div>
                    
                    <div className={cn(
                      "text-xl md:text-3xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3",
                      parseFloat(result.ratio) >= 1 ? "text-gold-500" : "text-red-500"
                    )}>
                      <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                      {parseFloat(result.ratio) >= 1 ? 'Oversubscribed' : 'Under-subscribed'}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="p-8 rounded-[2.5rem] border bg-navy-900 border-white/5 transition-all hover:border-gold-500/30">
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4 text-slate-500">Asset Units Issued</p>
                      <p className="text-2xl md:text-3xl font-black text-white leading-none">{result.issued}</p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] border bg-navy-900 border-white/5 transition-all hover:border-gold-500/30">
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4 text-slate-500">Market Demand (Applied)</p>
                      <p className="text-2xl md:text-3xl font-black text-white leading-none">{result.applied}</p>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <Clock size={14} className="text-gold-500" />
                    <span>Last Sync Status: {result.lastUpdated}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

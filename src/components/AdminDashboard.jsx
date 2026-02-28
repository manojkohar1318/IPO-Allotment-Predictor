import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  Save, 
  AlertCircle,
  Database
} from 'lucide-react';
import { SECTORS } from '../constants';

export const AdminDashboard = ({ lang, ipos, setIpos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIpo, setEditingIpo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    nameNP: '',
    sector: 'Commercial Bank',
    type: 'IPO',
    category: 'General Public',
    issuedUnits: 0,
    price: 100,
    openDate: '',
    closeDate: ''
  });

  const handleOpenModal = (ipo) => {
    if (ipo) {
      setEditingIpo(ipo);
      setFormData(ipo);
    } else {
      setEditingIpo(null);
      setFormData({
        name: '',
        nameNP: '',
        sector: 'Commercial Bank',
        type: 'IPO',
        category: 'General Public',
        issuedUnits: 0,
        price: 100,
        openDate: '',
        closeDate: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (editingIpo) {
        setIpos(prev => prev.map(item => item.id === editingIpo.id ? { ...item, ...formData } : item));
      } else {
        const newIpo = {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
        };
        setIpos(prev => [newIpo, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to save IPO data.");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this IPO?')) return;
    setIpos(prev => prev.filter(item => item.id !== id));
  };

  const filteredIpos = ipos.filter(ipo => 
    ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ipo.nameNP.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
            <Database className="text-emerald-500" /> Admin Panel
          </h1>
          <p className="text-slate-400">Manage IPO data and site content (Local Session Only).</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-gold px-8 py-4 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New IPO
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-8 flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-slate-500 font-bold text-xs uppercase">Total IPOs</span>
          <span className="text-2xl font-black text-emerald-500">{ipos.length}</span>
        </div>
      </div>

      {/* IPO List */}
      <div className="glass rounded-[2.5rem] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Dates</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredIpos.map((ipo) => (
                <tr key={ipo.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold">{ipo.name}</div>
                    <div className="text-xs text-slate-500">{ipo.sector}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-navy-900 text-gold-400 border border-gold-500/30">
                      {ipo.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 border border-white/10">
                      {ipo.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-400">NPR {ipo.price}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-medium">{ipo.openDate}</div>
                    <div className="text-[10px] text-slate-500">to {ipo.closeDate}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(ipo)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(ipo.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{editingIpo ? 'Edit IPO' : 'Add New IPO'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Company Name (EN)</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Company Name (NP)</label>
                    <input 
                      required
                      value={formData.nameNP}
                      onChange={(e) => setFormData({...formData, nameNP: e.target.value})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sector</label>
                    <select 
                      value={formData.sector}
                      onChange={(e) => setFormData({...formData, sector: e.target.value})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      <option value="IPO">IPO</option>
                      <option value="FPO">FPO</option>
                      <option value="Rights">Rights</option>
                      <option value="Debenture">Debenture</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      <option value="General Public">General Public</option>
                      <option value="Locals">Locals</option>
                      <option value="Foreign Employment">Foreign Employment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Issued Units</label>
                    <input 
                      type="number"
                      required
                      value={formData.issuedUnits}
                      onChange={(e) => setFormData({...formData, issuedUnits: Number(e.target.value)})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Issue Price (NPR)</label>
                    <input 
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Open Date</label>
                    <input 
                      type="date"
                      required
                      value={formData.openDate}
                      onChange={(e) => setFormData({...formData, openDate: e.target.value})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Close Date</label>
                    <input 
                      type="date"
                      required
                      value={formData.closeDate}
                      onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="btn-gold w-full py-4 text-lg flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" /> {editingIpo ? 'Update IPO' : 'Save IPO'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

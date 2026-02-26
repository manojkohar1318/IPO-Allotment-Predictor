import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  TrendingUp, 
  ChevronDown,
  Globe
} from 'lucide-react';
import { Language } from '../types';
import { cn } from '../types';

interface EducationSectionProps {
  lang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState('basics');
  const [contentLang, setContentLang] = useState<Language>(lang);

  const content = {
    basics: {
      title: "IPO Basics",
      titleNP: "IPO को आधारभूत कुराहरू",
      icon: BookOpen,
      items: [
        {
          q: "What is an IPO?",
          qNP: "IPO भनेको के हो?",
          a: "An Initial Public Offering (IPO) is when a private company offers its shares to the public for the first time to raise capital.",
          aNP: "प्रारम्भिक सार्वजनिक निष्कासन (IPO) भनेको जब एउटा निजी कम्पनीले पहिलो पटक पूँजी जुटाउन सर्वसाधारणलाई आफ्नो शेयर बिक्री गर्छ।"
        },
        {
          q: "How to apply for IPO in Nepal?",
          qNP: "नेपालमा IPO कसरी आवेदन दिने?",
          a: "You need a Demat account, a bank account with C-ASBA facility, and MeroShare login credentials.",
          aNP: "तपाईलाई डिम्याट खाता, C-ASBA सुविधा भएको बैंक खाता, र मेरोशेयर लगइन विवरणहरू चाहिन्छ।"
        }
      ]
    },
    allotment: {
      title: "How Allotment Works",
      titleNP: "बाँडफाँड कसरी हुन्छ?",
      icon: HelpCircle,
      items: [
        {
          q: "The Lottery System",
          qNP: "गोलाप्रथा प्रणाली",
          a: "In Nepal, if an IPO is oversubscribed, shares are allotted via a lottery system where each lucky winner gets 10 units.",
          aNP: "नेपालमा, यदि IPO मा माग भन्दा बढी आवेदन परेमा, गोलाप्रथा प्रणाली मार्फत बाँडफाँड गरिन्छ जहाँ प्रत्येक भाग्यशाली विजेताले १० कित्ता प्राप्त गर्छन्।"
        },
        {
          q: "Why 10 Kitta?",
          qNP: "किन १० कित्ता?",
          a: "SEBON policy aims to distribute shares to as many small investors as possible, hence the 10-unit minimum rule.",
          aNP: "धितोपत्र बोर्ड (SEBON) को नीतिले सकेसम्म धेरै साना लगानीकर्ताहरूलाई शेयर वितरण गर्ने लक्ष्य राखेको छ, त्यसैले १० कित्ताको न्यूनतम नियम छ।"
        }
      ]
    },
    tips: {
      title: "Tips to Maximize Allotment",
      titleNP: "बाँडफाँडको सम्भावना बढाउने सुझावहरू",
      icon: Lightbulb,
      items: [
        {
          q: "Apply from Multiple Accounts",
          qNP: "धेरै खाताहरूबाट आवेदन दिनुहोस्",
          a: "Apply using accounts of family members (spouse, children, parents) to increase your chances in the lottery.",
          aNP: "गोलाप्रथामा आफ्नो सम्भावना बढाउन परिवारका सदस्यहरू (पति/पत्नी, छोराछोरी, आमाबाबु) को खाताहरू प्रयोग गरेर आवेदन दिनुहोस्।"
        },
        {
          q: "Avoid Multiple Applications from Same Person",
          qNP: "एउटै व्यक्तिको धेरै आवेदन नदिनुहोस्",
          a: "Applying more than once from the same Demat account will lead to rejection of all your applications.",
          aNP: "एउटै डिम्याट खाताबाट एक पटक भन्दा बढी आवेदन दिँदा तपाईका सबै आवेदनहरू रद्द हुनेछन्।"
        }
      ]
    },
    listing: {
      title: "Understanding Listing Price",
      titleNP: "सूचीकरण मूल्य बुझ्दै",
      icon: TrendingUp,
      items: [
        {
          q: "Opening Range",
          qNP: "ओपनिङ रेन्ज",
          a: "The opening price range is usually between the Net Worth per share and 3 times the Net Worth.",
          aNP: "ओपनिङ मूल्यको दायरा सामान्यतया प्रति शेयर नेटवर्थ र नेटवर्थको ३ गुणाको बीचमा हुन्छ।"
        },
        {
          q: "When to Sell?",
          qNP: "कहिले बेच्ने?",
          a: "It depends on the company's fundamentals and market sentiment. Many investors sell after the first few days of 'Positive Circuit'.",
          aNP: "यो कम्पनीको आधारभूत पक्ष र बजारको मनोविज्ञानमा भर पर्छ। धेरै लगानीकर्ताहरूले पहिलो केही दिनको 'पोजिटिभ सर्किट' पछि बिक्री गर्छन्।"
        }
      ]
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Education Center</h2>
          <p className="text-slate-400">Master the NEPSE IPO market with our curated guides.</p>
        </div>
        <button 
          onClick={() => setContentLang(contentLang === 'EN' ? 'NP' : 'EN')}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-xl text-emerald-400 font-bold hover:bg-emerald-600/30 transition-all"
        >
          <Globe className="w-4 h-4" />
          {contentLang === 'EN' ? 'नेपालीमा पढ्नुहोस्' : 'Read in English'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(content).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
              activeTab === key 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            )}
          >
            <value.icon className="w-5 h-5" />
            {contentLang === 'EN' ? value.title : value.titleNP}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab + contentLang}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {content[activeTab as keyof typeof content].items.map((item, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-500 text-sm">
                Q
              </div>
              {contentLang === 'EN' ? item.q : item.qNP}
            </h3>
            <div className="flex items-start gap-3 text-slate-400 leading-relaxed">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-slate-500 text-sm">
                A
              </div>
              <p>{contentLang === 'EN' ? item.a : item.aNP}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="mt-12 p-8 bg-gold-500/5 border border-gold-500/20 rounded-3xl flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center shrink-0">
          <Lightbulb className="w-10 h-10 text-gold-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gold-400 mb-2">Pro Tip for Nepali Investors</h4>
          <p className="text-slate-400">
            Always check the "Net Worth Per Share" in the IPO prospectus. It determines your opening price range. 
            If a company has a net worth of NPR 120, its opening range will be NPR 120 to NPR 360.
          </p>
        </div>
      </div>
    </div>
  );
};

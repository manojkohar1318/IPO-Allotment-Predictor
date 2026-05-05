import React from 'react';
import { cn } from '../cn';
import { BookOpen, ShieldCheck, Zap, Info, TrendingUp } from 'lucide-react';

export const PredictorGuide = ({ isDark }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className={cn(
          "glass rounded-[3rem] p-8 md:p-16 border relative overflow-hidden",
          isDark ? "border-white/10" : "border-slate-200 bg-white/50"
        )}>
          <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12">
            <TrendingUp size={200} />
          </div>

          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                How Allotment <span className="text-gold-500">Prediction</span> Works
              </h2>
              <p className="text-slate-400 font-medium">A comprehensive guide to the math and the mechanisms behind our engine.</p>
            </div>

            <div className="prose prose-invert max-w-none prose-p:text-slate-400 prose-p:leading-loose prose-h3:text-gold-500 prose-h3:font-bold prose-strong:text-white">
              <h3>The Mechanism of NEPSE IPO Allotments</h3>
              <p>
                To understand how our predictor works, one must first understand the 10-kitta rule implemented by the Securities Board of Nepal (SEBON). In the Nepali stock market (NEPSE), when a company issues an Initial Public Offering (IPO), the minimum allotment per successful applicant is almost always 10 units. However, because the number of applicants often exceeds the total number of units available by millions, the CDSC (Central Depository and Settlement System) uses a randomized electronic lottery to determine winners.
              </p>

              <h3>Our Algorithmic Approach</h3>
              <p>
                Our predictor uses a <strong>Multi-Factor Probability Model</strong>. Unlike simple calculators that just divide the number of units by the number of applicants, our engine analyzes historical trends across different sectors:
              </p>
              <ul>
                <li><strong>Oversubscription Ratio:</strong> We calculate the total units available for the general public versus the total applied units. A 10x oversubscription generally means a 1 in 10 chance, but sector demand fluctuates this significantly.</li>
                <li><strong>Sector Categorization:</strong> History shows that Microfinance and Insurance sectors attract more long-term holders, while Hydropower sectors often have higher unit counts but variable subscription rates.</li>
                <li><strong>Probability Density:</strong> We calculate the "Allotment Odds Percentage" using a statistical distribution that accounts for the minimum 10-unit rule.</li>
              </ul>

              <h3>Why Multiple Accounts Matter</h3>
              <p>
                While the lottery is random for a single account, the laws of probability state that your chances increase linearly with the number of accounts you apply from. If a single account has a 10% chance of winning, applying from 10 unique family accounts doesn't guarantee a win, but it shifts the statistical likelihood significantly in your favor, approximately a 65% chance of at least one hit based on Bernoulli trial mathematics.
              </p>

              <h3>Data Integrity and Real-Time Tracking</h3>
              <p>
                We pull real-time subscription data from official CDSC reporting and MeroShare totals. By comparing current live data with the final subscription numbers of the last 50 IPOs, our AI identifies "Subscription Velocity"—how fast people are applying during the final hours of the issue. This allows us to predict the final oversubscription ratio even before the IPO closes.
              </p>

              <h3>Final Disclaimer</h3>
              <p>
                Our tool is designed for educational and planning purposes. Because the CDSC system involves a true randomized seed, no software can guarantee an "allotted" result. We provide the mathematical edge so you can plan your family investment strategy with clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
              <div className="flex flex-col items-center text-center space-y-2">
                <ShieldCheck className="text-gold-500 w-8 h-8" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">100% Secure</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Zap className="text-gold-500 w-8 h-8" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Real-Time Data</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Info className="text-gold-500 w-8 h-8" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Expert Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

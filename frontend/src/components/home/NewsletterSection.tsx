import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { F, S } from '../../styles/theme';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section aria-label="Newsletter Subscription" className="w-full">
      <div className="rounded-2xl bg-gray-50/80 dark:bg-[#141414] border border-gray-100 dark:border-gray-800 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
        
        {/* Left Side: Headline & Description */}
        <div className="max-w-md">
          <h2 
            className="text-sm sm:text-base font-semibold text-gray-950 dark:text-gray-100 tracking-tight"
            style={{ fontFamily: F.family }}
          >
            Join my newsletter
          </h2>
          <p 
            className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-400 font-normal mt-0.5 leading-relaxed"
            style={{ fontFamily: F.family }}
          >
            Get the latest posts, thoughts, and tech stories straight to your inbox.
          </p>
        </div>

        {/* Right Side: Form Controls */}
        <div className="w-full md:w-auto">
          {submitted ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>You're subscribed! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Input container */}
              <div className="relative flex-1 sm:w-64 md:w-72">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-750 focus:border-gray-900 dark:focus:border-gray-500 focus:outline-none text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                  style={{ fontFamily: F.family }}
                />
              </div>

              {/* Black pill button */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gray-950 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-950 text-xs font-medium transition-all shadow-sm flex-shrink-0"
                style={S.pill}
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

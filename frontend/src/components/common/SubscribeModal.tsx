import React, { useState } from 'react';
import { Mail, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      // Store in localStorage for frontend demo
      try {
        const stored = JSON.parse(localStorage.getItem('subscribed_emails') || '[]');
        if (!stored.includes(email)) {
          stored.push(email);
          localStorage.setItem('subscribed_emails', JSON.stringify(stored));
        }
      } catch (err) {
        console.error('Failed to save demo subscription', err);
      }
      setStatus('success');
    }, 600);
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={handleReset}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Subscribe to newsletter"
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 tracking-tight">You're subscribed!</h3>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              Thanks for joining the reading list. In this demo preview, your email has been saved locally.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 tracking-tight">Stay updated</h3>
              <p className="text-sm text-gray-500 font-normal mt-1 leading-relaxed">
                Receive fresh perspectives on AI breakthroughs, computing hardware, and software development directly to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    status === 'error' ? 'border-red-300 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  disabled={status === 'loading'}
                />
                {status === 'error' && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-5 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span>Subscribing...</span>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                No actual spam, unsubscribe at any time.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

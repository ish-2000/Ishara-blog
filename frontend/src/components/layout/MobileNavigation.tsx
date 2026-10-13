import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Search, Mail } from 'lucide-react';
import { siteConfig } from '../../config/site';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenSubscribe,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div>
              <span className="text-lg font-medium text-gray-900 tracking-tight">{siteConfig.name}</span>
              <p className="text-xs text-gray-400 mt-0.5">{siteConfig.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="py-6 space-y-1">
            {siteConfig.navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-xl text-base font-normal transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions & Socials */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span>Search</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSubscribe();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Subscribe</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2 text-gray-400">
            {siteConfig.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors p-1"
                aria-label={social.label}
              >
                <span className="text-xs uppercase font-medium">{social.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

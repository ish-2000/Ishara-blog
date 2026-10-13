import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowRight, Menu } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { SubscribeModal } from '../common/SubscribeModal';
import { MobileNavigation } from './MobileNavigation';
import { F, S } from '../../styles/theme';

export const Header: React.FC = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow">
        <div className="max-w-[1200px] border-b border-gray-200 mx-auto px-4 sm:px-6 lg:px-10 h-12 sm:h-16 flex items-center justify-between">
          
          {/* Left: Brand */}
          <Link to="/" className="group flex items-center">
            <span 
              className="text-lg sm:text-xl font-medium tracking-tight text-gray-950 hover:text-black transition-colors"
              style={{ fontFamily: F.family }}
            >
              {siteConfig.name}
            </span>
          </Link>

          {/* Right: Desktop Navigation & Subscribe Button */}
          <div className="flex items-center gap-6 sm:gap-7">
            <nav className="hidden md:flex items-center gap-6 lg:gap-7" aria-label="Main Navigation">
              {siteConfig.navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `relative py-1 text-xs sm:text-sm transition-colors ${
                      isActive
                        ? 'text-gray-950 font-medium'
                        : 'text-gray-500 hover:text-gray-900 font-normal'
                    }`
                  }
                  style={{ fontFamily: F.family }}
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Subscribe Button */}
            <button
              type="button"
              onClick={() => setIsSubscribeOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gray-950 hover:bg-black text-white text-xs font-medium rounded-full shadow-sm hover:shadow transition-all"
              style={S.pill}
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      <SubscribeModal 
        isOpen={isSubscribeOpen} 
        onClose={() => setIsSubscribeOpen(false)} 
      />

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => {}}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />
    </>
  );
};

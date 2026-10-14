import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowRight, Menu, Sun, Moon } from "lucide-react";
import { siteConfig } from "../../config/site";
import { SubscribeModal } from "../common/SubscribeModal";
import { MobileNavigation } from "./MobileNavigation";
import { F, S } from "../../styles/theme";
import { useTheme } from "../../hooks/useTheme";

export const Header: React.FC = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md transition-shadow border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 h-12 sm:h-16 flex items-center justify-between">
          
          {/* Left: Brand */}
          <Link to="/" className="group flex items-center">
            <span 
              className="text-lg sm:text-xl font-medium tracking-tight text-gray-950 dark:text-gray-100 hover:text-black dark:hover:text-white transition-colors"
              style={{ fontFamily: F.family }}
            >
              {siteConfig.name}
            </span>
          </Link>

          {/* Right: Desktop Navigation & Subscribe Button */}
          <div className="flex items-center gap-4 sm:gap-5">
            <nav className="hidden md:flex items-center gap-5 lg:gap-6" aria-label="Main Navigation">
              {siteConfig.navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `relative py-1 text-xs sm:text-sm transition-colors ${
                      isActive
                        ? "text-gray-950 dark:text-gray-100 font-medium"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-normal"
                    }`
                  }
                  style={{ fontFamily: F.family }}
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Subscribe Button */}
            <button
              type="button"
              onClick={() => setIsSubscribeOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gray-950 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-950 text-xs font-medium rounded-full shadow-sm hover:shadow transition-all"
              style={S.pill}
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

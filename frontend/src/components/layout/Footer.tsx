import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Rss } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { F } from '../../styles/theme';

// Clean SVG for X (formerly Twitter)
const XIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0D0D0D] border-t border-gray-100 dark:border-gray-800 mt-4 sm:mt-6">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Brand & Tagline */}
          <div>
            <Link to="/" className="inline-block group">
              <span 
                className="text-base font-medium tracking-tight text-gray-950 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors"
                style={{ fontFamily: F.family }}
              >
                {siteConfig.name}
              </span>
            </Link>
            <p 
              className="text-xs text-gray-400 font-normal mt-0.5"
              style={{ fontFamily: F.family }}
            >
              Tech, AI, development, design, and the things I'm learning.
            </p>
          </div>

          {/* Right: Navigation Links, Divider & Social Icons */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <nav className="flex items-center gap-5 sm:gap-6" aria-label="Footer Navigation">
              {siteConfig.footerNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-100 transition-colors font-normal"
                  style={{ fontFamily: F.family }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Vertical Divider */}
            <span className="hidden sm:inline-block text-gray-300 dark:text-gray-700 font-light" aria-hidden="true">
              |
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <a
                href={siteConfig.socials.find(s => s.platform === 'github')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.socials.find(s => s.platform === 'linkedin')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.socials.find(s => s.platform === 'twitter')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href="/rss.xml"
                className="hover:text-black dark:hover:text-white transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

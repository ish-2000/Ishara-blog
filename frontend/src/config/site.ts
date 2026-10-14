import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: "Ishara's Blog",
  subtitle: "Thoughts on AI, tech, and what's next.",
  description: "A personal technology publication focusing on artificial intelligence, chips and hardware, big tech developments, future technology, and modern software development.",
  portfolioUrl: "https://ishara.live",
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Journal', href: '/journal' },
    {label: 'News', href: '/news'},
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNavItems: [
    { label: 'Home', href: '/' },
    { label: 'Journal', href: '/journal' },
    { label: 'News', href: '/news' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  socials: [
    { platform: 'twitter', label: 'X (Twitter)', url: 'https://twitter.com/placeholder' },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/placeholder' },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/placeholder' },
    { platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@placeholder' },
  ],
};

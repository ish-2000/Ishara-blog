export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  role?: string;
}

export type CategorySlug = 
  | 'ai-news' 
  | 'chips' 
  | 'big-tech' 
  | 'future-tech' 
  | 'opinions' 
  | 'development';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  icon?: string;
  color: {
    bg: string;
    text: string;
    border: string;
    pill: string;
  };
  articleCount?: number;
}

export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  quote?: {
    text: string;
    author?: string;
  };
  image?: {
    url: string;
    alt?: string;
    caption?: string;
  };
  items?: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: CategorySlug;
  categoryName: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  featuredOrder?: number;
  content: string;
  sections?: ArticleSection[];
  relatedArticleIds: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'youtube';
  label: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  subtitle: string;
  description: string;
  portfolioUrl: string;
  socials: SocialLink[];
  navItems: NavigationItem[];
  footerNavItems: NavigationItem[];
}

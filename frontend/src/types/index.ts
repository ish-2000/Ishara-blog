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
  | 'development'
  | 'gaming';

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

// ─── Structured Block System ──────────────────────────────────────────────────
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'quote'
  | 'image'
  | 'list'
  | 'callout';

export interface HeadingBlock {
  type: 'heading';
  level: 2 | 3;
  id: string;
  text: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface CodeBlock {
  type: 'code';
  code: string;
  language?: string;
  filename?: string;
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
  author?: string;
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}

export interface ListBlock {
  type: 'list';
  style: 'bullet' | 'ordered';
  items: string[];
}

export interface CalloutBlock {
  type: 'callout';
  title?: string;
  text: string;
  variant?: 'info' | 'tip' | 'warning';
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | QuoteBlock
  | ImageBlock
  | ListBlock
  | CalloutBlock;

export interface ArticleMetadata {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: CategorySlug;
  categoryName: string;
  tags: string[];
  language?: string;
  author: Author;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  featuredOrder?: number;
  isDemo?: boolean;
  status?: 'published' | 'draft' | 'demo' | string;
  relatedArticleSlugs?: string[];
}

export interface ArticlePost extends ArticleMetadata {
  content?: string;
  blocks?: ContentBlock[];
  sections?: ArticleSection[];
  relatedArticleSlugs?: string[];
  relatedArticleIds?: string[];
}

export interface Article extends ArticleMetadata {
  content: string;
  sections?: ArticleSection[];
  blocks?: ContentBlock[];
  relatedArticleIds: string[];
  relatedArticleSlugs?: string[];
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

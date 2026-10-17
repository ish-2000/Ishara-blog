import { ArticleMetadata, ArticlePost } from '../types';
import { mockArticles } from '../data/mockArticles';

/**
 * ArticleService:
 * Centralized, single-source-of-truth service for loading and managing articles.
 *
 * Future API Migration:
 * When switching to Express + MongoDB in the future, only update BASE_DATA_PATH
 * and BASE_POSTS_PATH to your backend endpoints without touching UI components.
 */

const BASE_DATA_PATH = '/data/articles.json';
const BASE_POSTS_PATH = '/data/posts';

const SLUG_ALIASES: Record<string, string> = {
  'nvidia-new-chip-race': 'inside-nvidia-new-chip-race',
  'openai-vs-google-ai-battle': 'openai-vs-google-ai-battle-getting-personal',
  'is-web-ready-for-ai-search': 'is-the-web-ready-for-ai-search-to-take-over',
  'character-ai-bankruptcy-sinhala': 'character-ai-bankruptcy-sinhala-long',
  'barista-coffee-life-reflections-sinhala': 'barista-coffee-coworking-marketing-experience',
  'book-fair-barista-follow-your-passion-or-build-skills': 'bmich-barista-follow-your-passion-or-build-skills',
};

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  'ai-news': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'lifestyle': 'https://res.cloudinary.com/dgvdlyxhw/image/upload/v1792270111/Cozy_Barista_Caf%C3%A9_Coffee_Break_aew9h7.png',
  'big-tech': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'future-tech': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'opinions': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'development': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
  'gaming': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
};

export function getSafeCoverImage(url?: string, category?: string): string {
  if (
    !url ||
    typeof url !== 'string' ||
    url.trim() === '' ||
    url.includes('YOUR_CLOUD_NAME') ||
    url.includes('REPLACE_THIS_COVER') ||
    url.includes('YOUR_CDN_DOMAIN')
  ) {
    if (category && DEFAULT_CATEGORY_IMAGES[category]) {
      return DEFAULT_CATEGORY_IMAGES[category];
    }
    return DEFAULT_CATEGORY_IMAGES['ai-news'];
  }
  return url.trim();
}

/**
 * Canonical helper to retrieve the exact cover image URL for an article.
 * Accepts an article object or a direct string URL, validating placeholder tokens.
 */
export function getArticleCoverImage(
  input?: { coverImage?: string; category?: string } | string | null,
  fallbackCategory?: string
): string {
  if (!input) {
    const cat = fallbackCategory || 'ai-news';
    return DEFAULT_CATEGORY_IMAGES[cat] || DEFAULT_CATEGORY_IMAGES['ai-news'];
  }
  const rawUrl = typeof input === 'string' ? input : input.coverImage;
  const category = (typeof input === 'object' && input.category) || fallbackCategory;

  return getSafeCoverImage(rawUrl, category);
}

/**
 * Standardized error handler for cover image elements.
 * Prevents infinite onError loops and provides a consistent fallback by category.
 */
export function cleanCategoryName(categoryName?: string, categorySlug?: string): string {
  if (!categoryName) {
    return categorySlug ? categorySlug.toUpperCase() : '';
  }
  return categoryName
    .replace(/\s*·.*$/, '')
    .replace(/\s*\(.*\)$/, '')
    .trim()
    .toUpperCase();
}

export function handleCoverImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category?: string
): void {
  const target = e.currentTarget;
  // Detach handler to avoid infinite looping if fallback fails
  target.onerror = null;
  target.src = getSafeCoverImage(undefined, category);
}

class ArticleService {
  private articlesCache: ArticleMetadata[] | null = null;
  private postsCache: Map<string, ArticlePost> = new Map();

  /**
   * Fetches the complete list of all article records from the index.
   */
  async getAllArticles(): Promise<ArticleMetadata[]> {
    if (this.articlesCache && this.articlesCache.length > 0) {
      return this.articlesCache;
    }

    try {
      const response = await fetch(BASE_DATA_PATH);
      if (!response.ok) {
        throw new Error(`Failed to load articles index: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Articles index payload must be an array');
      }

      const validated: ArticleMetadata[] = data
        .filter((item): item is ArticleMetadata => Boolean(item && item.id && item.slug && item.title))
        .map((item) => ({
          ...item,
          categoryName: cleanCategoryName(item.categoryName, item.category),
          coverImage: getSafeCoverImage(item.coverImage, item.category)
        }));

      // Sort newest first
      validated.sort((a, b) => {
        const timeA = new Date(a.publishedAt).getTime();
        const timeB = new Date(b.publishedAt).getTime();
        if (!isNaN(timeA) && !isNaN(timeB)) {
          return timeB - timeA;
        }
        return 0;
      });

      this.articlesCache = validated;
      return validated;
    } catch (err) {
      console.warn('[ArticleService] Error fetching articles index, falling back to local fallback data:', err);
      const fallback = [...mockArticles].map((a) => ({
        ...a,
        coverImage: getSafeCoverImage(a.coverImage, a.category)
      }));
      this.articlesCache = fallback;
      return fallback;
    }
  }

  /**
   * Returns only publicly published articles (excludes demo content and drafts).
   */
  async getPublishedArticles(): Promise<ArticleMetadata[]> {
    const all = await this.getAllArticles();
    return all.filter((a) => !a.isDemo && a.status !== 'draft');
  }

  /**
   * Fetches featured articles for the hero carousel and spotlight sections.
   * Only returns publicly published articles.
   */
  async getFeaturedArticles(limit = 6): Promise<ArticleMetadata[]> {
    const published = await this.getPublishedArticles();
    const featured = published.filter((a) => a.featured);

    featured.sort((a, b) => {
      const orderA = typeof a.featuredOrder === 'number' ? a.featuredOrder : 99;
      const orderB = typeof b.featuredOrder === 'number' ? b.featuredOrder : 99;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return (featured.length > 0 ? featured : published).slice(0, limit);
  }

  /**
   * Returns the latest published articles.
   */
  async getLatestArticles(limit = 4): Promise<ArticleMetadata[]> {
    const published = await this.getPublishedArticles();
    return published.slice(0, limit);
  }

  /**
   * Returns published articles matching a specific category slug.
   */
  async getArticlesByCategory(category: string, limit?: number): Promise<ArticleMetadata[]> {
    const published = await this.getPublishedArticles();
    const filtered = category === 'all'
      ? published
      : published.filter((a) => a.category === category);
    return limit ? filtered.slice(0, limit) : filtered;
  }

  /**
   * Performs real-time search across title, excerpt, and tags.
   */
  async searchArticles(query: string): Promise<ArticleMetadata[]> {
    const published = await this.getPublishedArticles();
    if (!query || !query.trim()) return published;

    const q = query.toLowerCase().trim();
    return published.filter((a) => {
      const titleMatch = a.title.toLowerCase().includes(q);
      const excerptMatch = a.excerpt?.toLowerCase().includes(q) ?? false;
      const tagMatch = a.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
      return titleMatch || excerptMatch || tagMatch;
    });
  }

  /**
   * Fetches full article post content by slug from `/data/posts/${slug}.json`.
   */
  async getArticleBySlug(rawSlug: string): Promise<ArticlePost | null> {
    if (!rawSlug) return null;
    const slug = SLUG_ALIASES[rawSlug] || rawSlug;

    if (this.postsCache.has(slug)) {
      return this.postsCache.get(slug)!;
    }

    try {
      const response = await fetch(`${BASE_POSTS_PATH}/${encodeURIComponent(slug)}.json`);
      if (response.ok) {
        const post: ArticlePost = await response.json();
        if (post && post.title && (post.blocks || post.sections || post.content)) {
          post.categoryName = cleanCategoryName(post.categoryName, post.category);
          post.coverImage = getSafeCoverImage(post.coverImage, post.category);
          this.postsCache.set(slug, post);
          return post;
        }
      }
    } catch (err) {
      console.warn(`[ArticleService] Could not fetch post JSON for "${slug}":`, err);
    }

    // Fallback: check metadata index or mockArticles
    const all = await this.getAllArticles();
    const fromIndex = all.find((a) => a.slug === slug);
    if (fromIndex) {
      const placeholderPost: ArticlePost = {
        ...fromIndex,
        blocks: [
          { type: 'heading', level: 2, id: 'overview', text: 'Overview' },
          { type: 'paragraph', text: fromIndex.excerpt }
        ]
      };
      this.postsCache.set(slug, placeholderPost);
      return placeholderPost;
    }

    const mock = mockArticles.find((a) => a.slug === slug);
    if (mock) {
      const fallbackPost: ArticlePost = {
        ...mock,
        coverImage: getSafeCoverImage(mock.coverImage, mock.category),
        blocks: mock.sections
          ? mock.sections.flatMap((s) => [
              { type: 'heading' as const, level: 2 as const, id: s.id, text: s.title },
              ...s.paragraphs.map((p) => ({ type: 'paragraph' as const, text: p })),
              ...(s.quote ? [{ type: 'quote' as const, text: s.quote.text, author: s.quote.author }] : []),
              ...(s.image ? [{ type: 'image' as const, url: s.image.url, alt: s.image.alt, caption: s.image.caption }] : []),
            ])
          : [{ type: 'paragraph' as const, text: mock.content || mock.excerpt }],
      };
      this.postsCache.set(slug, fallbackPost);
      return fallbackPost;
    }

    return null;
  }

  /**
   * Retrieves related articles based on category and tags with backfilling.
   * Only selects from published articles.
   */
  async getRelatedArticles(
    articleOrSlug: ArticleMetadata | string,
    categoryOrLimit?: string | number,
    tags?: string[],
    limit = 3
  ): Promise<ArticleMetadata[]> {
    const currentSlug = typeof articleOrSlug === 'string' ? articleOrSlug : articleOrSlug.slug;
    const category = typeof articleOrSlug === 'object'
      ? articleOrSlug.category
      : typeof categoryOrLimit === 'string'
      ? categoryOrLimit
      : undefined;
    const resolvedTags = typeof articleOrSlug === 'object'
      ? (articleOrSlug.tags || [])
      : Array.isArray(tags)
      ? tags
      : [];
    const resolvedLimit = typeof categoryOrLimit === 'number'
      ? categoryOrLimit
      : typeof limit === 'number'
      ? limit
      : 3;

    const published = await this.getPublishedArticles();
    const candidates = published.filter((a) => a.slug !== currentSlug);

    const scored = candidates.map((article) => {
      let score = 0;
      if (category && article.category === category) score += 3;
      if (article.tags && resolvedTags.length > 0) {
        const shared = article.tags.filter((t) => resolvedTags.includes(t));
        score += shared.length * 2;
      }
      return { article, score };
    });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime();
    });

    const results = scored.slice(0, resolvedLimit).map((s) => s.article);

    if (results.length < resolvedLimit) {
      const remaining = candidates.filter((c) => !results.some((r) => r.slug === c.slug));
      return [...results, ...remaining].slice(0, resolvedLimit);
    }

    return results;
  }

  clearCache(): void {
    this.articlesCache = null;
    this.postsCache.clear();
  }
}

export const articleService = new ArticleService();
export default articleService;

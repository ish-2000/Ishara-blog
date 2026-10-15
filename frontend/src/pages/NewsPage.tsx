import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Mail, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ArticleMetadata } from '../types';
import { articleService, getArticleCoverImage, handleCoverImageError } from '../services/articleService';
import { F } from '../styles/theme';

const newsCategories = [
  { label: 'All', value: 'all' },
  { label: 'AI News', value: 'ai-news' },
  { label: 'Chips', value: 'chips' },
  { label: 'Big Tech', value: 'big-tech' },
  { label: 'Future Tech', value: 'future-tech' },
  { label: 'Opinions', value: 'opinions' },
];

const trendingTopics = [
  { rank: '01', name: 'Artificial Intelligence', posts: '24 posts', slug: 'ai-news' },
  { rank: '02', name: 'NVIDIA & Chips', posts: '18 posts', slug: 'chips' },
  { rank: '03', name: 'OpenAI', posts: '16 posts', slug: 'ai-news' },
  { rank: '04', name: 'Google & DeepMind', posts: '14 posts', slug: 'big-tech' },
  { rank: '05', name: 'AI Agents', posts: '12 posts', slug: 'ai-news' },
  { rank: '06', name: 'Future of Work', posts: '10 posts', slug: 'future-tech' },
];

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    articleService.getPublishedArticles()
      .then((data) => {
        if (isMounted) {
          setArticles(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load news articles:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  // Filtered by category
  const categoryArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  // Main featured hero article (left column)
  const heroArticle = categoryArticles[0] || articles[0];

  // 4 Top stacked news items (middle column)
  const topStackedNews = useMemo(() => {
    const list = categoryArticles.length > 1 ? categoryArticles.slice(1, 5) : articles.slice(1, 5);
    return list;
  }, [categoryArticles, articles]);

  // Latest updates (4 columns under main section)
  const latestUpdates = useMemo(() => {
    if (articles.length >= 8) return articles.slice(4, 8);
    return articles.slice(0, 4);
  }, [articles]);

  // Editor's picks (3 wide items)
  const editorsPicks = useMemo(() => {
    const featured = articles.filter((a) => a.featured);
    if (featured.length >= 3) return featured.slice(0, 3);
    return articles.slice(0, 3);
  }, [articles]);

  // Latest from the newsroom (sidebar lower)
  const newsroomLatest = useMemo(() => {
    if (articles.length >= 12) return articles.slice(8, 12);
    return articles.slice(2, 6);
  }, [articles]);

  return (
    <main
      className="w-full bg-white dark:bg-[#0D0D0D] min-h-screen pt-4 sm:pt-6 pb-16"
      style={{ fontFamily: F.family }}
    >
      <PageContainer>

        {/* ─── 1. PAGE HEADER ──────────────────────────────────────────────── */}
        <header className="mb-6 sm:mb-8">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500 font-semibold mb-2">
            Newsroom
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-[40px] font-semibold tracking-[-0.035em] text-gray-950 dark:text-gray-100 leading-[1.12] mb-3">
            Latest tech news, signal over noise
          </h1>

          <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed max-w-2xl mb-6">
            Clear, thoughtful coverage of the people, products, and ideas shaping AI, chips, big tech and the next wave of technology.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {newsCategories.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-colors shrink-0 ${
                    active
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-950 dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#181818] font-normal'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* ─── 2. TOP EDITORIAL GRID (Col 5 / Col 4 / Col 3) ────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">

          {/* Left: Main Featured Article (5 cols) */}
          {heroArticle && (
            <div className="lg:col-span-5 flex flex-col group">
              <Link to={`/article/${heroArticle.slug}`} className="block">
                {/* Image Container with Badge */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                  <img
                    src={getArticleCoverImage(heroArticle)}
                    alt={heroArticle.title}
                    fetchPriority="high"
                    onError={(e) => handleCoverImageError(e, heroArticle.category)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3.5 left-3.5 inline-flex items-center rounded-full bg-black/85 backdrop-blur-md px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-white">
                    {heroArticle.categoryName}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug tracking-tight transition-colors mb-2">
                  {heroArticle.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[12px] sm:text-[13px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed line-clamp-2 mb-4">
                  {heroArticle.excerpt}
                </p>
              </Link>

              {/* Author Meta Row + Arrow Button */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400 dark:text-gray-500 mt-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={heroArticle.author.avatar || '/images/ishara-avatar.jpg'}
                    alt={heroArticle.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {heroArticle.author.name}
                  </span>
                  <span>•</span>
                  <span>{heroArticle.publishedAt}</span>
                  <span>•</span>
                  <span>{heroArticle.readingTime}</span>
                </div>

                <Link
                  to={`/article/${heroArticle.slug}`}
                  aria-label={`Read ${heroArticle.title}`}
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-black dark:group-hover:border-white transition-all shrink-0 ml-3"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Middle: 4 Stacked News Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
            {topStackedNews.map((item, idx) => (
              <div key={item.id} className={`group ${idx === 0 ? 'pb-4' : 'py-4'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[9px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                      {item.categoryName}
                    </span>
                    <Link
                      to={`/article/${item.slug}`}
                      className="block text-[13px] sm:text-[14px] font-medium text-gray-950 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug tracking-tight transition-colors line-clamp-2 mb-2"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
                      <span>{item.author.name}</span>
                      <span>•</span>
                      <span>{item.publishedAt}</span>
                      <span>•</span>
                      <span>{item.readingTime}</span>
                    </div>
                  </div>

                  <Link to={`/article/${item.slug}`} className="block shrink-0">
                    <div className="w-[84px] h-[64px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={getArticleCoverImage(item)}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => handleCoverImageError(e, item.category)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Trending Topics & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-6">

            {/* Trending Topics Box */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-[#121212] p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-gray-950 dark:text-gray-100" />
                <h3 className="text-xs font-semibold text-gray-950 dark:text-gray-100 uppercase tracking-wider">
                  Trending Topics
                </h3>
              </div>

              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <Link
                    key={topic.name}
                    to={`/journal?category=${topic.slug}`}
                    className="group flex items-center justify-between text-xs py-1 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500 w-4">
                        {topic.rank}
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {topic.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                      {topic.posts}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Mini Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-950 text-white p-5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold tracking-tight leading-snug mb-1">
                The Morning Dispatch
              </h3>
              <p className="text-[11px] text-gray-400 font-normal leading-relaxed mb-4">
                Get the top tech breakthroughs and signal-heavy analysis in your inbox every morning.
              </p>

              {newsletterSubmitted ? (
                <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/10 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You're on the list! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-white text-gray-950 hover:bg-gray-100 text-xs font-medium transition-colors"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>

          </div>

        </section>

        {/* ─── 3. LATEST UPDATES (4-Column Card Grid) ───────────────────────── */}
        <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-950 dark:text-gray-100 tracking-tight">
              Latest Updates
            </h2>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors"
            >
              <span>View all articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestUpdates.map((item) => (
              <Link
                key={item.id}
                to={`/article/${item.slug}`}
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-3">
                    <img
                      src={getArticleCoverImage(item)}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => handleCoverImageError(e, item.category)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full bg-black/75 backdrop-blur-md px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-white">
                      {item.categoryName}
                    </span>
                  </div>

                  <h3 className="text-[13px] sm:text-[14px] font-medium text-gray-950 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug tracking-tight transition-colors line-clamp-2 mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 pt-1">
                  <span>{item.author.name}</span>
                  <span>•</span>
                  <span>{item.publishedAt}</span>
                  <span>•</span>
                  <span>{item.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── 4. EDITOR'S PICKS & NEWSROOM LATEST ────────────────────────────── */}
        <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: 3 Editor's Picks (8 cols) */}
            <div className="lg:col-span-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-950 dark:text-gray-100 tracking-tight mb-6">
                Editor's Picks
              </h2>

              <div className="space-y-5">
                {editorsPicks.map((pick) => (
                  <Link
                    key={pick.id}
                    to={`/article/${pick.slug}`}
                    className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-[#121212] transition-all"
                  >
                    <div className="w-full sm:w-[160px] h-[105px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                      <img
                        src={getArticleCoverImage(pick)}
                        alt={pick.title}
                        loading="lazy"
                        onError={(e) => handleCoverImageError(e, pick.category)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                        {pick.categoryName}
                      </span>
                      <h3 className="text-sm sm:text-[15px] font-medium text-gray-950 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug tracking-tight transition-colors line-clamp-2 mb-2">
                        {pick.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
                        <span>{pick.author.name}</span>
                        <span>•</span>
                        <span>{pick.publishedAt}</span>
                        <span>•</span>
                        <span>{pick.readingTime}</span>
                      </div>
                    </div>

                    <div className="hidden sm:flex shrink-0 w-8 h-8 rounded-full border border-gray-100 dark:border-gray-800 items-center justify-center text-gray-400 group-hover:bg-gray-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-transparent transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Latest from the Newsroom (4 cols) */}
            <div className="lg:col-span-4">
              <h2 className="text-lg font-semibold text-gray-950 dark:text-gray-100 tracking-tight mb-6">
                From the Newsroom
              </h2>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {newsroomLatest.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={`/article/${item.slug}`}
                    className={`group flex items-start gap-3 ${idx === 0 ? 'pb-3.5' : 'py-3.5'}`}
                  >
                    <div className="w-[60px] h-[50px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0 mt-0.5">
                      <img
                        src={getArticleCoverImage(item)}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => handleCoverImageError(e, item.category)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-[8px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                        {item.categoryName}
                      </span>
                      <h4 className="text-[12px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug line-clamp-2 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {item.publishedAt} · {item.readingTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

      </PageContainer>
    </main>
  );
};

export default NewsPage;

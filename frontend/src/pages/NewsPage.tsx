import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Mail, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { F } from '../styles/theme';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  categorySlug: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: string;
}

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

  // Main featured article (left hero)
  const heroArticle: NewsItem = {
    id: 'gemini-shutdown-debate',
    slug: 'gemini-new-model-shutdown-debate',
    title: "Gemini's New Model and the Shutdown Debate — Are We Losing Control or Misreading the Story?",
    excerpt: "A look at Google's latest Gemini model, the recent shutdown concerns, and what the real story might be behind all the noise.",
    category: 'AI NEWS',
    categorySlug: 'ai-news',
    image: '/images/gemini-hero.jpg',
    author: {
      name: 'Ishara Perera',
      avatar: '/images/ishara-avatar.jpg',
    },
    publishedAt: 'Jun 14, 2024',
    readingTime: '7 min read',
  };

  // 4 Top stacked news items (middle column)
  const topStackedNews: NewsItem[] = [
    {
      id: 'nvidia-chip-race',
      slug: 'nvidia-new-chip-race',
      title: "Inside NVIDIA's New Chip Race — Power, Hype, and the Future of AI Hardware",
      category: 'CHIPS',
      categorySlug: 'chips',
      image: '/images/nvidia-chip.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'Jun 2, 2024',
      readingTime: '6 min read',
    },
    {
      id: 'ai-agents-autonomous',
      slug: 'could-ai-agents-become-too-autonomous',
      title: 'Could AI Agents Become Too Autonomous? My Thoughts on the Latest Scares',
      category: 'OPINIONS',
      categorySlug: 'opinions',
      image: '/images/ai-robot.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'May 18, 2024',
      readingTime: '5 min read',
    },
    {
      id: 'openai-vs-google-ai-battle',
      slug: 'openai-vs-google-ai-battle',
      title: 'The OpenAI vs Google AI Battle Is Getting Personal',
      category: 'BIG TECH',
      categorySlug: 'big-tech',
      image: '/images/openai-vs-google.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'May 5, 2024',
      readingTime: '6 min read',
    },
    {
      id: 'ai-search-web',
      slug: 'is-web-ready-for-ai-search',
      title: 'Is the Web Ready for AI Search to Take Over?',
      category: 'FUTURE TECH',
      categorySlug: 'future-tech',
      image: '/images/future-tech.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'Apr 22, 2024',
      readingTime: '6 min read',
    },
  ];

  // Latest updates (4 columns under main section)
  const latestUpdates: NewsItem[] = [
    {
      id: 'meta-open-source-ai',
      slug: 'building-a-focused-tech-setup',
      title: "Meta's New AI Model Pushes the Boundaries of Open Source",
      excerpt: "A look at Meta's latest model, what it can do, and how it changes the open source AI landscape.",
      category: 'AI NEWS',
      categorySlug: 'ai-news',
      image: '/images/news-meta-ai.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'Jun 11, 2024',
      readingTime: '6 min read',
    },
    {
      id: 'microsoft-ai-pc-vision',
      slug: 'building-a-focused-tech-setup',
      title: "Microsoft's AI PC Vision Is Starting to Take Shape",
      excerpt: "From new hardware to deeper AI integration, here's what Microsoft's latest announcements mean for the future.",
      category: 'BIG TECH',
      categorySlug: 'big-tech',
      image: '/images/news-microsoft.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'Jun 7, 2024',
      readingTime: '5 min read',
    },
    {
      id: 'ai-glasses-change-everything',
      slug: 'building-a-focused-tech-setup',
      title: 'How AI Glasses Could Change Everything',
      excerpt: 'A look at the next generation of AI-powered wearables and what they mean for everyday life.',
      category: 'FUTURE TECH',
      categorySlug: 'future-tech',
      image: '/images/news-glasses.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'Jun 3, 2024',
      readingTime: '6 min read',
    },
    {
      id: 'real-ai-risk-nuanced',
      slug: 'building-a-focused-tech-setup',
      title: "The Real AI Risk Isn't What You Think",
      excerpt: 'Exploring why the biggest risks of AI might be more nuanced than the usual doomsday narratives.',
      category: 'OPINIONS',
      categorySlug: 'opinions',
      image: '/images/news-globe.jpg',
      author: {
        name: 'Ishara Perera',
        avatar: '/images/ishara-avatar.jpg',
      },
      publishedAt: 'May 28, 2024',
      readingTime: '5 min read',
    },
  ];

  // Editor's picks (3 wide items)
  const editorsPicks = [
    {
      id: 'editors-pick-1',
      slug: 'could-ai-agents-become-too-autonomous',
      title: 'Are We Building AI Agents We Can Actually Trust?',
      category: 'OPINIONS',
      categorySlug: 'opinions',
      image: '/images/ai-robot.jpg',
      readingTime: '6 min read',
    },
    {
      id: 'editors-pick-2',
      slug: 'nvidia-new-chip-race',
      title: 'The Next Decade of AI: 5 Big Shifts to Watch',
      category: 'FUTURE TECH',
      categorySlug: 'future-tech',
      image: '/images/news-datacenter.jpg',
      readingTime: '7 min read',
    },
    {
      id: 'editors-pick-3',
      slug: 'gemini-new-model-shutdown-debate',
      title: 'Why This AI Moment Feels Different',
      category: 'AI NEWS',
      categorySlug: 'ai-news',
      image: '/images/future-tech.jpg',
      readingTime: '5 min read',
    },
  ];

  // Latest from the newsroom (sidebar lower)
  const newsroomLatest = [
    {
      id: 'newsroom-1',
      slug: 'gemini-new-model-shutdown-debate',
      title: "OpenAI's New Tools Signal a More Agentic Future",
      category: 'AI NEWS',
      image: '/images/news-meta-ai.jpg',
      publishedAt: 'Jun 12, 2024',
      readingTime: '5 min read',
    },
    {
      id: 'newsroom-2',
      slug: 'nvidia-new-chip-race',
      title: "Tesla's AI Ambitions Are Bigger Than Just Self-Driving",
      category: 'BIG TECH',
      image: '/images/news-tesla.jpg',
      publishedAt: 'Jun 8, 2024',
      readingTime: '6 min read',
    },
    {
      id: 'newsroom-3',
      slug: 'could-ai-agents-become-too-autonomous',
      title: "Apple's AI Strategy Is Finally Starting to Make Sense",
      category: 'OPINIONS',
      image: '/images/news-apple.jpg',
      publishedAt: 'Jun 1, 2024',
      readingTime: '4 min read',
    },
    {
      id: 'newsroom-4',
      slug: 'is-web-ready-for-ai-search',
      title: 'Humanoid Robots Are Closer Than We Think',
      category: 'FUTURE TECH',
      image: '/images/future-tech.jpg',
      publishedAt: 'May 20, 2024',
      readingTime: '6 min read',
    },
  ];

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
          <div className="lg:col-span-5 flex flex-col group">
            <Link to={`/article/${heroArticle.slug}`} className="block">
              {/* Image Container with Badge */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <img
                  src={heroArticle.image}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3.5 left-3.5 inline-flex items-center rounded-full bg-black/85 backdrop-blur-md px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-white">
                  {heroArticle.category}
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
                  src={heroArticle.author.avatar}
                  alt={heroArticle.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {heroArticle.author.name}
                </span>
                <span>·</span>
                <span>{heroArticle.publishedAt}</span>
                <span>·</span>
                <span>{heroArticle.readingTime}</span>
              </div>

              <Link
                to={`/article/${heroArticle.slug}`}
                aria-label={`Read ${heroArticle.title}`}
                className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:bg-gray-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-gray-950 dark:group-hover:border-white transition-all duration-200 shrink-0 ml-2"
              >
                <ArrowRight size={13} strokeWidth={1.8} />
              </Link>
            </div>
          </div>

          {/* Middle: 4 Stacked News Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col divide-y divide-gray-100 dark:divide-gray-850">
            {topStackedNews.map((item, idx) => (
              <div
                key={item.id}
                className={`group flex items-center gap-3.5 py-3.5 ${
                  idx === 0 ? 'pt-0' : ''
                } ${idx === topStackedNews.length - 1 ? 'pb-0' : ''}`}
              >
                {/* Thumbnail */}
                <Link
                  to={`/article/${item.slug}`}
                  className="w-[110px] sm:w-[120px] aspect-[16/11] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mb-1">
                    {item.category}
                  </span>

                  <Link to={`/article/${item.slug}`} className="block">
                    <h3 className="text-[13px] font-semibold text-gray-950 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug tracking-tight transition-colors line-clamp-2 mb-1.5">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500">
                    <img
                      src={item.author.avatar}
                      alt={item.author.name}
                      className="w-3.5 h-3.5 rounded-full object-cover"
                    />
                    <span className="text-gray-600 dark:text-gray-400 shrink-0">
                      {item.author.name}
                    </span>
                    <span>·</span>
                    <span className="shrink-0">{item.publishedAt}</span>
                    <span>·</span>
                    <span className="shrink-0">{item.readingTime}</span>
                  </div>
                </div>

                {/* Arrow Button */}
                <Link
                  to={`/article/${item.slug}`}
                  aria-label={`Read ${item.title}`}
                  className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-800 hidden sm:flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-gray-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-gray-950 dark:group-hover:border-white transition-all shrink-0 ml-1"
                >
                  <ArrowRight size={11} strokeWidth={1.8} />
                </Link>
              </div>
            ))}
          </div>

          {/* Right: Sidebar with Trending Topics & Newsletter (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Trending Topics Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#141414] p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-gray-800 dark:text-gray-200" />
                <h3 className="text-[14px] font-semibold text-gray-950 dark:text-gray-100 tracking-tight">
                  Trending Topics
                </h3>
              </div>

              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <Link
                    key={topic.rank}
                    to={`/journal?category=${topic.slug}`}
                    className="flex items-center justify-between group py-0.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 rounded px-1.5 py-0.5 shrink-0">
                        {topic.rank}
                      </span>
                      <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
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

            {/* Join My Newsletter Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#141414] p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <Mail className="w-4 h-4 text-gray-800 dark:text-gray-200" />
                <h3 className="text-[14px] font-semibold text-gray-950 dark:text-gray-100 tracking-tight">
                  Join my newsletter
                </h3>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed mb-4">
                Get the latest tech news, insights, and thoughtful analysis straight to your inbox.
              </p>

              {newsletterSubmitted ? (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Subscribed! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2 text-xs rounded-full bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-xs font-medium hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={12} />
                  </button>
                </form>
              )}
            </div>

          </div>

        </section>

        {/* ─── 3. LOWER SECTION (Left 9 cols: Latest updates + Editor's picks | Right 3 cols: Latest from newsroom) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start mt-12 sm:mt-14">

          {/* Left Column (9 cols) */}
          <div className="lg:col-span-9 flex flex-col">

            {/* Section: Latest updates */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-950 dark:text-gray-100 tracking-tight">
                  Latest updates
                </h2>
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors"
                >
                  View all news <ArrowRight size={13} />
                </Link>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestUpdates.map((item) => (
                  <Link
                    key={item.id}
                    to={`/article/${item.slug}`}
                    className="group flex flex-col"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-2.5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <span className="inline-block text-[8px] font-semibold uppercase tracking-[0.06em] text-gray-400 dark:text-gray-500 mb-1">
                      {item.category}
                    </span>

                    <h3 className="text-[13px] font-semibold text-gray-950 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug tracking-tight transition-colors line-clamp-2 mb-1">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-normal leading-snug line-clamp-2 mb-2">
                      {item.excerpt}
                    </p>

                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-normal mt-auto">
                      {item.publishedAt} · {item.readingTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section: Editor's picks */}
            <div className="mt-10 sm:mt-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-950 dark:text-gray-100 tracking-tight">
                  Editor's picks
                </h2>
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors"
                >
                  View all picks <ArrowRight size={13} />
                </Link>
              </div>

              {/* 3 Compact Horizontal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {editorsPicks.map((pick) => (
                  <Link
                    key={pick.id}
                    to={`/article/${pick.slug}`}
                    className="group flex items-center justify-between gap-3 p-2.5 rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-[#141414] hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-[68px] h-[58px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                        <img
                          src={pick.image}
                          alt={pick.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[12px] font-semibold text-gray-950 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug line-clamp-2 mb-1 transition-colors">
                          {pick.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[9px] text-gray-400 dark:text-gray-500 font-normal">
                          <span className="font-semibold uppercase text-gray-500 dark:text-gray-400">{pick.category}</span>
                          <span>·</span>
                          <span>{pick.readingTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-gray-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-gray-950 dark:group-hover:border-white transition-all shrink-0 ml-1">
                      <ArrowRight size={11} strokeWidth={1.8} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (3 cols): Latest from the newsroom */}
          <div className="lg:col-span-3">
            <h2 className="text-[15px] font-semibold text-gray-950 dark:text-gray-100 tracking-tight mb-4">
              Latest from the newsroom
            </h2>

            <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-850">
              {newsroomLatest.map((item, idx) => (
                <Link
                  key={item.id}
                  to={`/article/${item.slug}`}
                  className={`group flex items-center gap-3 py-3 ${
                    idx === 0 ? 'pt-0' : ''
                  } ${idx === newsroomLatest.length - 1 ? 'pb-0' : ''}`}
                >
                  <div className="w-[64px] h-[56px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.06em] text-gray-400 dark:text-gray-500 mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="text-[12px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug line-clamp-2 transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 font-normal">
                      {item.publishedAt} · {item.readingTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </PageContainer>
    </main>
  );
};

export default NewsPage;

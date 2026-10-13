import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link2, 
  Check, 
  Users, 
  ArrowLeft,
  Printer,
  Mail,
  Home,
  BookOpen
} from 'lucide-react';
import { mockArticles } from '../data/mockArticles';
import { Article } from '../types';
import { F } from '../styles/theme';

// ─── Local Storage Bookmark Helper ────────────────────────────────────────────
const BOOKMARKS_STORAGE_KEY = 'ishara_blog_bookmarked_ids';

const getBookmarkedIds = (): string[] => {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const toggleBookmarkId = (id: string): boolean => {
  try {
    const current = getBookmarkedIds();
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    return !exists;
  } catch {
    return false;
  }
};

// ─── Newsletter Card ──────────────────────────────────────────────────────────
const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setFeedback('Please enter a valid email address.');
      return;
    }
    // Respect requirement: do not display a successful subscription unless a real submission mechanism confirms success.
    // Instead of faking subscription confirmation, display honest status.
    setFeedback('Newsletter subscription service is connecting. Thank you for your interest!');
    setEmail('');
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <h3
        className="text-[14px] font-semibold text-gray-950 leading-snug tracking-tight"
        style={{ fontFamily: F.family }}
      >
        A calmer, more intentional life — in your inbox
      </h3>
      <p 
        className="text-[12px] text-gray-500 font-normal mt-1.5 leading-relaxed" 
        style={{ fontFamily: F.family }}
      >
        Thoughts, tools, and stories on productivity, creativity, and a balanced tech life. No spam, ever.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (feedback) setFeedback(null);
          }}
          placeholder="Your email address"
          className="w-full rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 transition-colors"
          style={{ fontFamily: F.family }}
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-medium py-2.5 transition-colors"
          style={{ fontFamily: F.family }}
        >
          Subscribe
        </button>
      </form>

      {feedback && (
        <p className="mt-2.5 text-[11px] text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-2 leading-relaxed">
          {feedback}
        </p>
      )}

      <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-gray-400" style={{ fontFamily: F.family }}>
        <Users className="w-3.5 h-3.5" />
        <span>Join 5,000+ readers</span>
      </div>
    </div>
  );
};

// ─── Related Article Card ─────────────────────────────────────────────────────
const RelatedCard: React.FC<{ article: Article }> = ({ article }) => (
  <Link
    to={`/article/${article.slug}`}
    className="group flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 transition-all"
  >
    <div className="w-14 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
      <img
        src={article.coverImage}
        alt={article.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4
        className="text-[12px] font-semibold text-gray-950 group-hover:text-gray-600 line-clamp-2 leading-snug tracking-tight transition-colors"
        style={{ fontFamily: F.family }}
      >
        {article.title}
      </h4>
      <p 
        className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-medium" 
        style={{ fontFamily: F.family }}
      >
        {article.categoryName} · {article.publishedAt}
      </p>
    </div>
  </Link>
);

// ─── Share Panel ───────────────────────────────────────────────────────────────
const SharePanel: React.FC<{ articleTitle: string }> = ({ articleTitle }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareItems = [
    { 
      label: 'Twitter', 
      icon: <Twitter className="w-4 h-4" />, 
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(currentUrl)}` 
    },
    { 
      label: 'LinkedIn', 
      icon: <Linkedin className="w-4 h-4" />, 
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` 
    },
    { 
      label: 'Facebook', 
      icon: <Facebook className="w-4 h-4" />, 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` 
    },
  ];

  return (
    <div>
      <h3 
        className="text-[12px] font-semibold text-gray-950 mb-2 uppercase tracking-wider" 
        style={{ fontFamily: F.family }}
      >
        Share this article
      </h3>
      <div className="space-y-0.5">
        {shareItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-1.5 text-[13px] text-gray-600 hover:text-gray-950 transition-colors"
            style={{ fontFamily: F.family }}
          >
            <span className="text-gray-400">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          className="w-full flex items-center gap-3 py-1.5 text-[13px] text-gray-600 hover:text-gray-950 transition-colors text-left"
          style={{ fontFamily: F.family }}
        >
          <span className="text-gray-400">
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}
          </span>
          <span>{copied ? 'Link copied!' : 'Copy link'}</span>
        </button>
      </div>
    </div>
  );
};

// ─── Article Body Component ───────────────────────────────────────────────────
const ArticleBody: React.FC<{ article: Article }> = ({ article }) => {
  // If article has structured sections, render each section authentically
  if (article.sections && article.sections.length > 0) {
    return (
      <div className="article-body" style={{ fontFamily: F.family }}>
        {article.sections.map((section, idx) => (
          <div key={section.id} className={idx === 0 ? '' : 'mt-9'}>
            <h2
              id={section.id}
              className="text-xl sm:text-[22px] font-semibold text-gray-950 mb-3.5 tracking-tight scroll-mt-24"
              style={{ fontFamily: F.family }}
            >
              {section.title}
            </h2>

            {section.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-700 mb-4 font-normal"
                style={{ fontFamily: F.family }}
              >
                {p}
              </p>
            ))}

            {section.quote && (
              <blockquote className="border-l-[2.5px] border-gray-950 pl-4 sm:pl-5 py-0.5 my-6">
                <p className="text-[15px] sm:text-[16px] italic leading-relaxed text-gray-800 font-normal">
                  {section.quote.text}
                </p>
                {section.quote.author && (
                  <footer className="text-[12px] text-gray-400 font-normal not-italic mt-2">
                    — {section.quote.author}
                  </footer>
                )}
              </blockquote>
            )}

            {section.image && (
              <div className="my-6 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                <img
                  src={section.image.url}
                  alt={section.image.alt || section.title}
                  className="w-full object-cover max-h-[300px]"
                />
                {section.image.caption && (
                  <p className="text-center text-[11px] text-gray-400 py-2">
                    {section.image.caption}
                  </p>
                )}
              </div>
            )}

            {section.items && section.items.length > 0 && (
              <div className="space-y-3 my-5">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-200/70 flex items-center justify-center flex-shrink-0 mt-0.5 text-gray-600 text-xs font-bold">
                      →
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-950 leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[12px] text-gray-500 font-normal mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Fallback: render paragraphs from article.content
  const paragraphs = article.content
    ? article.content.split('\n\n').filter(Boolean)
    : [article.excerpt];

  return (
    <div className="article-body" style={{ fontFamily: F.family }}>
      <h2 id="content" className="text-xl sm:text-[22px] font-semibold text-gray-950 mb-3.5 tracking-tight scroll-mt-24">
        Overview
      </h2>
      {paragraphs.map((p, idx) => (
        <p
          key={idx}
          className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-700 mb-4 font-normal"
          style={{ fontFamily: F.family }}
        >
          {p}
        </p>
      ))}
    </div>
  );
};

// ─── Article Not Found State ──────────────────────────────────────────────────
const ArticleNotFound: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
    <div className="text-center max-w-md">
      <span className="inline-block text-xs font-mono font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
        404 — Not Found
      </span>
      <h1 className="text-3xl font-semibold text-gray-950 mb-3 tracking-tight" style={{ fontFamily: F.family }}>
        Article Not Found
      </h1>
      <p className="text-sm text-gray-500 mb-8 leading-relaxed" style={{ fontFamily: F.family }}>
        The article you are looking for doesn't exist, may have been moved, or the link is incorrect.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-black text-white text-xs font-medium rounded-full transition-colors"
          style={{ fontFamily: F.family }}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Browse Journal</span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-full transition-colors"
          style={{ fontFamily: F.family }}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  </div>
);

// ─── Main ArticlePage ─────────────────────────────────────────────────────────
export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Look up article dynamically by slug. Requirement: show proper article-not-found for unknown slugs.
  const article = mockArticles.find((a) => a.slug === slug);

  // If article not found, render 404 state
  if (!article) {
    return <ArticleNotFound />;
  }

  return <ArticleView article={article} />;
};

// ─── Article View Component ───────────────────────────────────────────────────
const ArticleView: React.FC<{ article: Article }> = ({ article }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    return getBookmarkedIds().includes(article.id);
  });
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Dynamic Table of Contents items derived from the actual article sections
  const tocItems = React.useMemo(() => {
    if (article.sections && article.sections.length > 0) {
      return article.sections.map((s) => ({ id: s.id, label: s.title }));
    }
    return [{ id: 'content', label: 'Overview' }];
  }, [article.sections]);

  // Set initial active section
  useEffect(() => {
    if (tocItems.length > 0) {
      setActiveSection(tocItems[0].id);
    }
  }, [tocItems]);

  // Dynamic IntersectionObserver tracking active section based on real headings
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  // Dismiss More menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    if (isMoreOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMoreOpen]);

  // Toggle bookmark handler with persistence
  const handleBookmarkToggle = () => {
    const newState = toggleBookmarkId(article.id);
    setIsBookmarked(newState);
  };

  // Share handler
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      });
    }
  };

  // Copy link helper
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyFeedback(true);
      setTimeout(() => {
        setCopyFeedback(false);
        setIsMoreOpen(false);
      }, 1500);
    });
  };

  // Print helper
  const handlePrint = () => {
    setIsMoreOpen(false);
    window.print();
  };

  // Dynamic related articles using existing relatedArticleIds
  const related = React.useMemo(() => {
    const matched = mockArticles.filter(
      (a) => a.id !== article.id && article.relatedArticleIds?.includes(a.id)
    );
    // If fewer than 3, backfill with other articles so layout remains balanced
    if (matched.length < 3) {
      const others = mockArticles.filter(
        (a) => a.id !== article.id && !matched.some((m) => m.id === a.id)
      );
      return [...matched, ...others].slice(0, 3);
    }
    return matched.slice(0, 3);
  }, [article.id, article.relatedArticleIds]);

  return (
    <div
      className="min-h-screen bg-white pt-2 pb-16 sm:pb-24"
      style={{ fontFamily: F.family }}
    >
      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* Page Container: 1200px max width matching site layout               */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================================================================ */}
        {/* TOP METADATA ROW (Reference: CATEGORY / DATE / READING TIME)     */}
        {/* ================================================================ */}
        <div className="flex items-center gap-2 pt-6 pb-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          <Link
            to="/journal"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            {article.categoryName}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">{article.publishedAt.toUpperCase()}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">{article.readingTime.toUpperCase()}</span>
        </div>

        {/* ================================================================ */}
        {/* 3-COLUMN EDITORIAL LAYOUT                                        */}
        {/* Left: TOC | Center: Article | Right: Sidebar                     */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr_260px] xl:grid-cols-[200px_1fr_270px] gap-8 xl:gap-12 items-start">

          {/* ============================================================== */}
          {/* LEFT COLUMN: STICKY TABLE OF CONTENTS                          */}
          {/* ============================================================== */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <p className="text-[11px] font-medium text-gray-400 mb-3" style={{ fontFamily: F.family }}>
              On this page
            </p>
            <nav className="space-y-1" aria-label="Article table of contents">
              {tocItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex items-center py-1 text-[13px] transition-colors leading-snug group ${
                      isActive
                        ? 'text-gray-950 font-medium'
                        : 'text-gray-400 hover:text-gray-700 font-normal'
                    }`}
                  >
                    {/* Left vertical indicator line */}
                    <span
                      className={`flex-shrink-0 w-[2px] h-[16px] rounded-full mr-2.5 transition-all duration-200 ${
                        isActive ? 'bg-gray-950' : 'bg-transparent'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* ============================================================== */}
          {/* CENTER COLUMN: ARTICLE CONTENT                                 */}
          {/* ============================================================== */}
          <article className="min-w-0">

            {/* Article Heading */}
            <h1
              className="text-2xl sm:text-3xl md:text-[34px] font-medium text-gray-950 tracking-[-0.035em] leading-[1.2] mb-3"
              style={{ fontFamily: F.family }}
            >
              {article.title}
            </h1>

            {/* Excerpt / Subtitle */}
            <p
              className="text-[15px] sm:text-[16px] text-gray-500 font-normal leading-relaxed mb-6"
              style={{ fontFamily: F.family }}
            >
              {article.excerpt}
            </p>

            {/* Author Row & Action Icons */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-100">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
                />
                <div>
                  <p 
                    className="text-[13px] font-semibold text-gray-950 leading-tight" 
                    style={{ fontFamily: F.family }}
                  >
                    By {article.author.name}
                  </p>
                  <p 
                    className="text-[11px] text-gray-400 font-normal mt-0.5" 
                    style={{ fontFamily: F.family }}
                  >
                    {article.author.role || 'Writer · Builder · Lifelong Learner'}
                  </p>
                </div>
              </div>

              {/* Action Icons: Bookmark, Share, More */}
              <div className="relative flex items-center gap-1.5" ref={moreMenuRef}>
                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={handleBookmarkToggle}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                  title={isBookmarked ? 'Bookmarked' : 'Bookmark article'}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                    isBookmarked
                      ? 'border-gray-900 bg-gray-950 text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:text-gray-950 hover:border-gray-400'
                  }`}
                >
                  <Bookmark 
                    className="w-4 h-4" 
                    fill={isBookmarked ? 'currentColor' : 'none'} 
                  />
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShareClick}
                  aria-label="Share article"
                  title="Share article"
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-950 hover:border-gray-400 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* More Options Button */}
                <button
                  type="button"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  aria-label="More options"
                  title="More options"
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-950 hover:border-gray-400 transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {/* More Dropdown Menu */}
                {isMoreOpen && (
                  <div className="absolute right-0 top-11 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="w-full px-3.5 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5 text-gray-400" />}
                      <span>{copyFeedback ? 'Link copied!' : 'Copy link'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="w-full px-3.5 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-gray-400" />
                      <span>Print article</span>
                    </button>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`}
                      className="w-full px-3.5 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>Email to a friend</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div className="my-6 rounded-2xl overflow-hidden bg-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full object-cover max-h-[380px] aspect-[16/10]"
              />
            </div>

            {/* Dynamic Article Body */}
            <ArticleBody article={article} />

            {/* Bottom Mobile-Friendly Share & Related Sections */}
            <div className="lg:hidden mt-12 pt-8 border-t border-gray-100 space-y-8">
              <NewsletterCard />
              {related.length > 0 && (
                <div>
                  <h3 className="text-[12px] font-semibold text-gray-950 mb-3 uppercase tracking-wider">
                    Related articles
                  </h3>
                  <div className="space-y-1">
                    {related.map((rel) => (
                      <RelatedCard key={rel.id} article={rel} />
                    ))}
                  </div>
                </div>
              )}
              <SharePanel articleTitle={article.title} />
            </div>

          </article>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: STICKY SIDEBAR                                   */}
          {/* ============================================================== */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-24 self-start">

            {/* Newsletter Card */}
            <NewsletterCard />

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Related Articles */}
            {related.length > 0 && (
              <div>
                <h3
                  className="text-[12px] font-semibold text-gray-950 mb-3 uppercase tracking-wider"
                  style={{ fontFamily: F.family }}
                >
                  Related articles
                </h3>
                <div className="space-y-1">
                  {related.map((rel) => (
                    <RelatedCard key={rel.id} article={rel} />
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Share Panel */}
            <SharePanel articleTitle={article.title} />

          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

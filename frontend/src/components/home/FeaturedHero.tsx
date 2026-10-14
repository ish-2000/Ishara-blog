
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mockArticles } from "../../data/mockArticles";
import { F, S } from "../../styles/theme";

export const FeaturedHero: React.FC = () => {
  const featuredArticles = mockArticles.slice(0, 6);
  const stackedArticles = mockArticles.slice(1, 4);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = featuredArticles.length;
  const heroArticle = featuredArticles[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) =>
      (prev - 1 + totalSlides) % totalSlides
    );
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  // Automatically switch featured articles every 5 seconds
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides]);

  if (!heroArticle) return null;

  return (
    <section
      aria-label="Featured Articles"
      className="w-full"
      style={{ fontFamily: F.family }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] gap-5">

        {/* LEFT: FEATURED HERO */}
        <div
          className="relative group h-[440px] sm:h-[420px] lg:h-[370px] xl:h-[390px] overflow-hidden rounded-xl bg-[#080c13]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background images with cross-fade */}
          {featuredArticles.map((article, index) => (
            <img
              key={article.id}
              src={article.coverImage}
              alt=""
              aria-hidden={index !== activeSlide}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
                index === activeSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))}

          {/* Left-weighted cinematic gradient */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 30%, rgba(0,0,0,0.10) 72%, transparent 100%)",
            }}
          />

          {/* Bottom vignette */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-transparent to-black/20" />

          {/* Category badge */}
          <div className="absolute top-6 left-6 z-10">
            <span
              style={S.darkBadge}
              className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-white uppercase"
            >
              {heroArticle.categoryName}
            </span>
          </div>

          {/* Content */}
          <div
            key={heroArticle.id}
            className="absolute bottom-5 left-6 right-6 sm:left-7 sm:right-7 z-10"
          >
            <div className="max-w-[410px] lg:max-w-[55%] xl:max-w-[53%]">

              <Link to={`/article/${heroArticle.slug}`}>
                <h1 className="text-[23px] sm:text-[26px] lg:text-[27px] xl:text-[30px] font-normal tracking-[-0.035em] leading-[1.13] text-white hover:text-white/85 transition-colors">
                  {heroArticle.title}
                </h1>
              </Link>

              <p className="mt-2 text-[12px] sm:text-[13px] font-light leading-[1.45] text-white/70 line-clamp-3">
                {heroArticle.excerpt}
              </p>

              {/* Author details */}
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-4">
                <img
                  src={heroArticle.author.avatar}
                  alt={heroArticle.author.name}
                  className="w-6 h-6 rounded-full object-cover border border-white/30"
                />

                <span className="text-[11px] text-white/85">
                  {heroArticle.author.name}
                </span>

                <span className="text-white/45 text-[11px]">•</span>

                <span className="text-[11px] text-white/65">
                  {heroArticle.publishedAt}
                </span>

                <span className="text-white/45 text-[11px]">•</span>

                <span className="text-[11px] text-white/65">
                  {heroArticle.readingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          {totalSlides > 1 && (
            <div className="absolute bottom-5 right-5 sm:right-6 z-20 flex items-center gap-4">

              {/* Pagination */}
              <div
                className="hidden sm:flex items-center gap-[6px]"
                aria-label="Featured article pagination"
              >
                {featuredArticles.map((article, index) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show featured article ${index + 1}`}
                    aria-current={index === activeSlide ? "true" : undefined}
                    className={`h-[7px] rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? "w-[12px] bg-white"
                        : "w-[7px] bg-white/35 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              {/* Previous */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous featured article"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black/60 text-white hover:bg-black/85 backdrop-blur-md transition-all"
              >
                <ArrowLeft size={17} strokeWidth={1.8} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next featured article"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black hover:bg-gray-200 transition-all"
              >
                <ArrowRight size={17} strokeWidth={1.8} />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: THREE STACKED NEWS ARTICLES */}
        <div className="flex flex-col min-w-0 h-full justify-between">

          {stackedArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className={`group flex flex-1 items-center gap-4 py-2 first:pt-0 last:pb-0 ${
                index !== stackedArticles.length - 1
                  ? "border-b border-gray-200 dark:border-gray-800"
                  : ""
              }`}
            >

              {/* Thumbnail */}
              <div className="w-[38%] sm:w-[160px] lg:w-[38%] aspect-[1.43] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Article information */}
              <div className="flex-1 min-w-0">

                <span
                  style={S.badge}
                  className="inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-[9px] leading-none uppercase tracking-[0.08em] text-gray-600 dark:text-gray-400 font-medium"
                >
                  {article.categoryName}
                </span>

                <h2 className="mt-2 text-[13px] sm:text-[14px] lg:text-[13px] xl:text-[15px] font-medium tracking-[-0.03em] leading-[1.25] text-[#171717] dark:text-gray-200 line-clamp-3 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">
                  {article.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-[11px] font-normal text-gray-400 dark:text-gray-500">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

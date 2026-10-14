
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import { PageContainer } from "../components/layout/PageContainer";
import { mockArticles } from "../data/mockArticles";
import { F } from "../styles/theme";

const ARTICLES_PER_PAGE = 6;

export const JournalPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">(
    "newest"
  );
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Keep categories from existing articles
  const filterTabs = useMemo(() => {
    const categories = new Map<string, string>();

    mockArticles.forEach((article) => {
      if (article.category && article.categoryName) {
        categories.set(article.category, article.categoryName);
      }
    });

    return [
      { label: "All", value: "all" },
      ...Array.from(categories, ([value, label]) => ({
        label,
        value,
      })),
    ];
  }, []);

  // Filtering and sorting
  const filteredArticles = useMemo(() => {
    const articles =
      selectedFilter === "all"
        ? [...mockArticles]
        : mockArticles.filter(
            (article) => article.category === selectedFilter
          );

    return articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  }, [selectedFilter, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  );

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, sortOrder]);

  return (
    <main
      className="w-full bg-white dark:bg-[#0D0D0D] min-h-screen pt-4 sm:pt-4 pb-12 sm:pb-16"
      style={{ fontFamily: F.family }}
    >
      <PageContainer>

        {/* PAGE HEADING */}
        <header className="mb-4 sm:mb-5">
          <span className="block text-[10px] uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500 font-medium mb-2">
            Journal
          </span>

          <h1 className="text-2xl sm:text-2xl md:text-2xl font-normal leading-[1.12] tracking-[-0.045em] text-[#111111] dark:text-gray-100">
            Thoughts, notes, and tutorials
          </h1>

          <p className="mt-2 text-[13px] sm:text-[15px] text-[#8B8E98] dark:text-gray-400 font-normal leading-[1.4] max-w-[590px]">
            I write about development, design, product thinking,
            and the web — sharing what I learn, build,
            and explore along the way.
          </p>
        </header>

        {/* FILTER AND SORT BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-2">

          {/* Filters */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {filterTabs.map((tab) => {
              const active = selectedFilter === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedFilter(tab.value)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full px-4 py-[3px] text-[12px] transition-colors ${
                    active
                      ? "bg-[#F0F0F2] dark:bg-gray-800 text-black dark:text-white font-medium"
                      : "text-[#333333] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] font-medium"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sorting */}
          <div className="relative shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              aria-expanded={isSortOpen}
              aria-label="Sort articles"
              className="flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-800 px-4 py-[7px] text-[12px] text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-[#141414] transition-colors"
            >
              {sortOrder === "newest"
                ? "Newest first"
                : "Oldest first"}

              <ChevronDown size={13} strokeWidth={1.7} />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1A1A1A] shadow-lg z-30 overflow-hidden">
                {(["newest", "oldest"] as const).map(
                  (order) => (
                    <button
                      key={order}
                      type="button"
                      onClick={() => {
                        setSortOrder(order);
                        setIsSortOpen(false);
                      }}
                      className={`block w-full px-4 py-2.5 text-left text-xs transition-colors ${
                        sortOrder === order
                          ? "bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      {order === "newest"
                        ? "Newest first"
                        : "Oldest first"}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* ARTICLES LIST */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {paginatedArticles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-3 transition-colors"
            >

              {/* Thumbnail */}
              <div className="relative w-full sm:w-[225px] lg:w-[230px] h-[140px] sm:h-[110px] shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">

                {/* Category */}
                <span className="inline-flex mb-1.5 items-center rounded-full bg-[#F1F1F3] dark:bg-gray-800 px-2.5 py-[3px] text-[8px] font-medium uppercase tracking-[0.05em] text-[#555555] dark:text-gray-400">
                  {article.categoryName}
                </span>

                {/* Title */}
                <h2 className="mt-1 text-[15px] sm:text-[16px] font-medium text-[#171717] dark:text-gray-100 leading-[1.2] tracking-[-0.025em] group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors line-clamp-2">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-1 text-[12px] sm:text-[13px] font-normal text-[#9598A3] dark:text-gray-400 leading-[1.3] max-w-[540px] line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] sm:text-[11px] font-normal text-[#9598A3] dark:text-gray-500">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-[20px] h-[20px] rounded-full object-cover"
                  />

                  <span className="text-[#737780] dark:text-gray-300">
                    {article.author.name}
                  </span>

                  <span>•</span>
                  <span>{article.publishedAt}</span>

                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex shrink-0 ml-auto">
                <div className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-black dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-black dark:group-hover:border-white transition-all duration-200">
                  <ArrowRight
                    size={16}
                    strokeWidth={1.7}
                  />
                </div>
              </div>

            </Link>
          ))}

          {paginatedArticles.length === 0 && (
            <p className="py-16 text-center text-sm text-gray-400 dark:text-gray-500">
              No articles found in this category.
            </p>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav
            aria-label="Journal pagination"
            className="flex items-center justify-center gap-2 mt-6 mb-2"
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              aria-label="Previous page"
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft size={14} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-label={`Page ${page}`}
                aria-current={
                  currentPage === page ? "page" : undefined
                }
                className={`w-8 h-8 rounded-full text-[12px] transition-colors ${
                  currentPage === page
                    ? "bg-[#F0F0F2] dark:bg-gray-800 text-black dark:text-white font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              aria-label="Next page"
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowRight size={14} />
            </button>
          </nav>
        )}

      </PageContainer>
    </main>
  );
};

export default JournalPage;

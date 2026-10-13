
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockArticles } from "../../data/mockArticles";
import { F, S } from "../../styles/theme";

export const MidFeatureBanner: React.FC = () => {
  const article = mockArticles[2];

  if (!article) return null;

  return (
    <section
      aria-label="Highlighted Story"
      className="w-full border-y border-gray-200 py-3"
      style={{ fontFamily: F.family }}
    >
      <Link
        to={`/article/${article.slug}`}
        className="group flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        {/* Featured Image */}
        <div className="relative w-full sm:w-[290px] lg:w-[345px] h-[200px] sm:h-[138px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Article Content */}
        <div className="flex-1 min-w-0">
          <span
            style={S.badge}
            className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-gray-600"
          >
            {article.categoryName}
          </span>

          <h2 className="mt-2 text-[15px] sm:text-[17px] font-medium tracking-tight leading-snug text-gray-950 group-hover:text-gray-600 transition-colors line-clamp-2">
            {article.title}
          </h2>

          <p className="mt-1 text-[12px] sm:text-[13px] font-normal leading-relaxed text-gray-400 line-clamp-2 max-w-[650px]">
            {article.excerpt}
          </p>

          {/* Author and Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-5 w-5 rounded-full object-cover"
            />

            <span className="text-gray-600">
              {article.author.name}
            </span>

            <span>•</span>
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-800 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
          <ArrowRight size={17} strokeWidth={1.7} />
        </div>
      </Link>
    </section>
  );
};

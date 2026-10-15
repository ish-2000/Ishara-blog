import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ArticleMetadata } from '../../types';
import { articleService, getArticleCoverImage, handleCoverImageError } from '../../services/articleService';
import { F, S } from '../../styles/theme';

export const LatestPostsGrid: React.FC = () => {
  const [posts, setPosts] = useState<ArticleMetadata[]>([]);

  useEffect(() => {
    let isMounted = true;
    articleService.getPublishedArticles().then((all) => {
      if (isMounted) {
        setPosts(all.slice(1, 5));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section aria-label="Latest Posts" className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 
          className="text-lg sm:text-xl font-medium text-gray-950 dark:text-gray-100 tracking-tight"
          style={{ fontFamily: F.family }}
        >
          Latest posts
        </h2>

        <Link
          to="/blogs"
          className="group inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-gray-100 transition-colors"
          style={{ fontFamily: F.family }}
        >
          <span>View all posts</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 4-Column Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/article/${post.slug}`}
            className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#0D0D0D] transition-all duration-200"
          >
            <div>
              {/* Rounded Landscape Image Container */}
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <img
                  src={getArticleCoverImage(post)}
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => handleCoverImageError(e, post.category)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Pill */}
              <div className="mb-1.5">
                <span
                  style={S.badge}
                  className="text-[8px] font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full uppercase"
                >
                  {post.categoryName}
                </span>
              </div>

              {/* Title */}
              <h3 
                className="text-[12px] sm:text-[15px] font-medium text-gray-950 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white line-clamp-2 leading-snug tracking-tight mb-1.5"
                style={{ fontFamily: F.family }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p 
                className="text-[12px] sm:text-sm text-gray-400 dark:text-gray-500 font-normal line-clamp-3 leading-relaxed mb-3"
                style={{ fontFamily: F.family }}
              >
                {post.excerpt}
              </p>
            </div>

            {/* Date & Reading Time Meta */}
            <div 
              className="pt-1 text-[11px] text-gray-400 dark:text-gray-500 font-light"
              style={{ fontFamily: F.family }}
            >
              <span>{post.publishedAt}</span>
              <span className="mx-1">•</span>
              <span>{post.readingTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

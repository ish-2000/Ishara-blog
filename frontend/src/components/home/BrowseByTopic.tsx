import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, Building2, MessageSquare, TrendingUp } from 'lucide-react';
import { C, F, S } from '../../styles/theme';

interface TopicItem {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

export const BrowseByTopic: React.FC = () => {
  const topics: TopicItem[] = [
    {
      name: 'AI News',
      slug: 'ai-news',
      icon: <Sparkles className="w-3.5 h-3.5 text-gray-700" />,
    },
    {
      name: 'Development',
      slug: 'development',
      icon: <Cpu className="w-3.5 h-3.5 text-gray-700" />,
    },
    {
      name: 'Design',
      slug: 'design',
      icon: <Building2 className="w-3.5 h-3.5 text-gray-700" />,
    },
    {
      name: 'Opinions',
      slug: 'opinions',
      icon: <MessageSquare className="w-3.5 h-3.5 text-gray-700" />,
    },
    {
      name: 'Future Tech',
      slug: 'future-tech',
      icon: <TrendingUp className="w-3.5 h-3.5 text-gray-700" />,
    },
  ];

  return (
    <section aria-label="Browse by topic" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Label */}
        <h2 
          className="text-lg sm:text-xl font-medium text-gray-950 flex-shrink-0 tracking-tight"
          style={{ fontFamily: F.family }}
        >
          Browse by topic
        </h2>

        {/* Horizontal Topic Pills */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              to={`/categories?topic=${topic.slug}`}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-900 bg-white hover:bg-gray-50 text-xs sm:text-sm text-gray-700 hover:text-black font-normal transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              style={S.pill}
            >
              <span>{topic.icon}</span>
              <span className="font-normal" style={{ fontFamily: F.family }}>{topic.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

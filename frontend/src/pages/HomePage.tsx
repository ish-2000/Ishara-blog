import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import {
  FeaturedHero,
  MidFeatureBanner,
  LatestPostsGrid,
  BrowseByTopic,
  NewsletterSection,
} from '../components/home';
import { C } from '../styles/theme';

export const HomePage: React.FC = () => {
  return (
    <div 
      className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-2 sm:pb-3 bg-white dark:bg-[#0D0D0D]"
    >
      <PageContainer>
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-7">
          {/* 1. Main Hero */}
          <FeaturedHero />

          {/* 2. Secondary Spotlight Banner */}
          <MidFeatureBanner />

          {/* 3. Latest Posts 4-Column Grid */}
          <LatestPostsGrid />

          {/* 4. Browse by Topic Pills */}
          <BrowseByTopic />

          {/* 5. Newsletter Subscription Card */}
          <NewsletterSection />
        </div>
      </PageContainer>
    </div>
  );
};

export default HomePage;

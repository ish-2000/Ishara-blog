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
      className="pt-2 sm:pt-4 pb-12 sm:pb-16"
      style={{ backgroundColor: C.bg }}
    >
      <PageContainer>
        <div className="space-y-7 sm:space-y-8 md:space-y-9">
          {/* 1. Main Hero: Large Featured Card (col-7) + 3 Rectangular Stacked Cards (col-5) */}
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

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { JournalPage } from '../pages/JournalPage';
import { NewsPage } from '../pages/NewsPage';
import { ArticlePage } from '../pages/ArticlePage';

import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<JournalPage />} />
        <Route path="blogs/:slug" element={<ArticlePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="article/:slug" element={<ArticlePage />} />
       
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

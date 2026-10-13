import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 text-center">
      <PageContainer size="narrow">
        <span className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full">404</span>
        <h1 className="text-4xl font-light text-gray-950 mt-4 mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-500 font-normal max-w-md mx-auto mb-8">
          The article or page you are looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-black text-white text-sm font-medium rounded-full transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </PageContainer>
    </div>
  );
};

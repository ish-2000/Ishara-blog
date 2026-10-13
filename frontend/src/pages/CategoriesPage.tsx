import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Grid } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="py-12">
      <PageContainer>
        <header className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4">
            <Grid className="w-3.5 h-3.5" />
            <span>Categories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-950 tracking-tight">
            Explore topics and technology fields.
          </h1>
          <p className="text-gray-500 font-normal mt-3 text-base leading-relaxed">
            Curated categories covering artificial intelligence, semiconductor chips, big tech dynamics, future tech, opinions, and development.
          </p>
        </header>

        <div className="border border-dashed border-gray-200 rounded-3xl p-12 text-center text-gray-400">
          <p className="text-sm font-normal">Topic grid cards and count metrics ready for Stage 5 implementation.</p>
        </div>
      </PageContainer>
    </div>
  );
};

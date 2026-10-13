import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { User, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12">
      <PageContainer size="narrow">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4">
            <User className="w-3.5 h-3.5" />
            <span>About Ishara</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-950 tracking-tight">
            About the author & the publication
          </h1>
          <p className="text-gray-500 font-normal mt-3 text-base leading-relaxed">
            Personal technology publication sharing insights on artificial intelligence, computing architectures, and software engineering.
          </p>
        </header>

        <div className="border border-dashed border-gray-200 rounded-3xl p-12 text-center text-gray-400 space-y-4">
          <p className="text-sm font-normal">
            About page profile layout, tech stack highlights, and portfolio integration will be configured in Stage 5.
          </p>
          <div>
            <a
              href={siteConfig.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <span>Visit personal portfolio ({siteConfig.portfolioUrl})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

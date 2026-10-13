import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12">
      <PageContainer size="narrow">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-950 tracking-tight">
            Get in touch
          </h1>
          <p className="text-gray-500 font-normal mt-3 text-base leading-relaxed">
            Have thoughts on an article, a question, or a project in mind? Reach out and let's connect.
          </p>
        </header>

        <div className="border border-dashed border-gray-200 rounded-3xl p-12 text-center text-gray-400">
          <p className="text-sm font-normal">
            Contact form with input validation and frontend demo feedback will be configured in Stage 5.
          </p>
        </div>
      </PageContainer>
    </div>
  );
};

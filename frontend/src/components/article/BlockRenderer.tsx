import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ContentBlock } from '../../types';
import { SafeText } from './SafeText';
import { F } from '../../styles/theme';

interface BlockRendererProps {
  blocks: ContentBlock[];
}

/**
 * CodeSnippet:
 * Renders formatted code block with copy-to-clipboard functionality and optional filename.
 */
const CodeSnippet: React.FC<{ code: string; language?: string; filename?: string }> = ({
  code,
  language,
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-[#0d1117] text-gray-200 text-xs shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800 text-[11px] font-mono text-gray-400">
        <span>{filename || language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-4 overflow-x-auto font-mono text-[13px] leading-relaxed select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="article-blocks space-y-5" style={{ fontFamily: F.family }}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            if (block.level === 3) {
              return (
                <h3
                  key={index}
                  id={block.id}
                  className="text-lg sm:text-[19px] font-medium text-gray-950 dark:text-gray-100 mt-7 mb-2 tracking-tight scroll-mt-24"
                >
                  {block.text}
                </h3>
              );
            }
            return (
              <h2
                key={index}
                id={block.id}
                className="text-xl sm:text-[22px] font-semibold text-gray-950 dark:text-gray-100 mt-9 mb-3.5 tracking-tight scroll-mt-24 first:mt-0"
              >
                {block.text}
              </h2>
            );
          }

          case 'paragraph': {
            return (
              <p
                key={index}
                className="text-[14px] sm:text-[15px] leading-[1.8] text-gray-700 dark:text-gray-300 font-normal"
              >
                <SafeText text={block.text} />
              </p>
            );
          }

          case 'quote': {
            return (
              <blockquote
                key={index}
                className="border-l-[2.5px] border-gray-950 dark:border-gray-200 pl-4 sm:pl-5 py-0.5 my-6"
              >
                <p className="text-[15px] sm:text-[16px] italic leading-relaxed text-gray-800 dark:text-gray-200 font-normal">
                  “{block.text.replace(/^[“"]|[”"]$/g, '')}”
                </p>
                {block.author && (
                  <footer className="text-[12px] text-gray-400 dark:text-gray-500 font-normal not-italic mt-2">
                     {block.author}
                  </footer>
                )}
              </blockquote>
            );
          }

          case 'image': {
            return (
              <figure
                key={index}
                className="my-7 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
              >
                <img
                  src={block.url}
                  alt={block.alt || 'Article visual content'}
                  loading="lazy"
                  className="w-full object-cover max-h-[420px]"
                />
                {block.caption && (
                  <figcaption className="text-center text-[11px] text-gray-400 dark:text-gray-500 py-2.5 px-4 bg-gray-50/50 dark:bg-black/30 border-t border-gray-100 dark:border-gray-800">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case 'list': {
            if (block.style === 'ordered') {
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 my-4 text-[14px] sm:text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed pl-1">
                  {block.items.map((item, iIdx) => (
                    <li key={iIdx} className="pl-1">
                      <SafeText text={item} />
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-4 text-[14px] sm:text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed pl-1">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="pl-1">
                    <SafeText text={item} />
                  </li>
                ))}
              </ul>
            );
          }

          case 'code': {
            return (
              <CodeSnippet
                key={index}
                code={block.code}
                language={block.language}
                filename={block.filename}
              />
            );
          }

          case 'callout': {
            return (
              <div
                key={index}
                className="my-6 pl-4 sm:pl-5 border-l-2 border-gray-200 dark:border-gray-800 py-1"
              >
                {block.title && (
                  <h4 className="text-[13px] sm:text-[14px] font-semibold text-gray-950 dark:text-gray-100 mb-1 tracking-tight">
                    {block.title}
                  </h4>
                )}
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-gray-600 dark:text-gray-400 font-normal">
                  <SafeText text={block.text} />
                </p>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;

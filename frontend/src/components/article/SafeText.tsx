import React from 'react';

interface SafeTextProps {
  text: string;
}

/**
 * SafeText:
 * Tokenizes markdown-like inline formatting without dangerouslySetInnerHTML.
 * Supports:
 * - [Link Text](https://example.com)
 * - **Bold Text**
 * - *Italic Text*
 * - `Inline Code`
 */
export const SafeText: React.FC<SafeTextProps> = ({ text }) => {
  if (!text) return null;

  // Regex matching:
  // 1. Links: [label](url)
  // 2. Bold: **text**
  // 3. Italic: *text*
  // 4. Code: `code`
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

  const parts = text.split(tokenRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        // 1. Link matching
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const closeBracket = part.indexOf('](');
          const label = part.slice(1, closeBracket);
          const rawUrl = part.slice(closeBracket + 2, -1);

          // Disallow javascript: or unsafe schemes
          const safeUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('/') || rawUrl.startsWith('#')
            ? rawUrl
            : '#';

          return (
            <a
              key={index}
              href={safeUrl}
              target={safeUrl.startsWith('http') ? '_blank' : undefined}
              rel={safeUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              {label}
            </a>
          );
        }

        // 2. Bold matching
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          return (
            <strong key={index} className="font-semibold text-gray-950 dark:text-gray-100">
              {part.slice(2, -2)}
            </strong>
          );
        }

        // 3. Italic matching
        if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
          return (
            <em key={index} className="italic text-gray-800 dark:text-gray-200">
              {part.slice(1, -1)}
            </em>
          );
        }

        // 4. Inline code matching
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          return (
            <code
              key={index}
              className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-mono text-[13px] border border-gray-200/60 dark:border-gray-750"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        // Plain string
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

export default SafeText;

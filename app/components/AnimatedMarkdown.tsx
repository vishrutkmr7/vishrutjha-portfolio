'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { cn } from '@/app/lib/utils';

interface AnimatedMarkdownProps {
  content: string;
  isAssistant?: boolean;
}

interface CodeComponentProps {
  className?: string;
  children?: React.ReactNode;
  inline?: boolean;
}

interface CodeBlockProps {
  language: string;
  value: string;
}

function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-4">
      <div className="absolute top-2 left-2 text-gray-400 text-xs">{language}</div>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded-2xl bg-white/10 p-2 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
      </button>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="!mt-0 rounded-2xl pt-8"
        showLineNumbers={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

export function AnimatedMarkdown({ content, isAssistant = false }: AnimatedMarkdownProps) {
  return (
    <div
      className={cn(
        'prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        isAssistant ? 'prose-neutral dark:prose-invert' : 'prose-primary'
      )}
    >
      <ReactMarkdown
        components={{
          code: ({ className, children = '', inline }: CodeComponentProps) => {
            if (inline) {
              return (
                <code className={cn('rounded bg-muted px-1.5 py-0.5 font-mono text-xs', className)}>
                  {children}
                </code>
              );
            }
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const value = String(children).replace(/\n$/, '');
            return <CodeBlock language={language} value={value} />;
          },
          p: ({ children }) => (
            <p
              className={cn(
                'my-1 leading-relaxed',
                isAssistant ? 'text-foreground' : 'text-primary-foreground'
              )}
            >
              {children}
            </p>
          ),
          ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'underline underline-offset-2 transition-colors',
                isAssistant
                  ? 'text-primary hover:text-primary/80'
                  : 'text-primary-foreground/90 hover:text-primary-foreground'
              )}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-muted-foreground/30 border-l-2 pl-3 italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

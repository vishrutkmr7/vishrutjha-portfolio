'use client';

import { motion, useInView } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useRef, useState } from 'react';
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

function ChatBubble({
  children,
  isAssistant,
}: {
  children: React.ReactNode;
  isAssistant: boolean;
}) {
  return (
    <div
      className={cn(
        'w-fit max-w-[85%] rounded-2xl px-4 py-2',
        isAssistant
          ? 'mr-auto ml-0 rounded-bl-none bg-muted text-foreground'
          : 'mr-0 ml-auto rounded-br-none bg-primary text-primary-foreground'
      )}
    >
      {children}
    </div>
  );
}

export function AnimatedMarkdown({ content, isAssistant = false }: AnimatedMarkdownProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const hasCodeBlock = content.includes('```');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {hasCodeBlock ? (
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
                    <code className={cn('rounded-2xl bg-muted px-1 py-0.5 text-sm', className)}>
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
                    'my-1 leading-6',
                    isAssistant ? 'text-foreground' : 'text-primary-foreground'
                  )}
                >
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="my-1 list-inside list-disc space-y-0.5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-1 list-inside list-decimal space-y-0.5">{children}</ol>
              ),
              li: ({ children }) => <li className="leading-6">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:text-primary/90"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="my-1 border-muted border-l-4 pl-4 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <ChatBubble isAssistant={isAssistant}>
          <div
            className={cn(
              'prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
              isAssistant ? 'prose-neutral dark:prose-invert' : 'prose-primary'
            )}
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <div className="m-0 leading-6">{children}</div>,
                code: ({ className, children = '', inline }: CodeComponentProps) => {
                  if (inline) {
                    return (
                      <code className={cn('rounded-2xl bg-muted px-1 py-0.5 text-sm', className)}>
                        {children}
                      </code>
                    );
                  }
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  const value = String(children).replace(/\n$/, '');
                  return <CodeBlock language={language} value={value} />;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </ChatBubble>
      )}
    </motion.div>
  );
}

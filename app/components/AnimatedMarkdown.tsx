'use client';

import { useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
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
  children: React.ReactNode;
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
    <div className="relative group my-4">
      <div className="absolute left-2 top-2 text-xs text-gray-400">{language}</div>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
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
        className="rounded-md !mt-0 pt-8"
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
        'px-4 py-2 rounded-lg max-w-[85%] w-fit',
        isAssistant
          ? 'bg-muted text-foreground ml-0 mr-auto rounded-bl-none'
          : 'bg-primary text-primary-foreground ml-auto mr-0 rounded-br-none'
      )}
    >
      {children}
    </div>
  );
}

export function AnimatedMarkdown({ content, isAssistant = false }: AnimatedMarkdownProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const processContent = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      if (parsed.response && parsed.response.content) {
        return parsed.response.content;
      }
    } catch {
      if (content.includes('```')) {
        return content;
      }
    }
    return content;
  };

  const processedContent = processContent(content);
  const hasCodeBlock = processedContent.includes('```');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {hasCodeBlock ? (
        <div
          className={`prose prose-sm max-w-none ${
            isAssistant ? 'prose-neutral dark:prose-invert' : 'prose-primary'
          }`}
        >
          <ReactMarkdown
            components={{
              // @ts-ignore
              code({ className, children, inline }: CodeComponentProps) {
                if (inline) {
                  return <code className={className}>{children}</code>;
                }
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                const value = String(children).replace(/\n$/, '');
                return <CodeBlock language={language} value={value} />;
              },
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      ) : (
        <ChatBubble isAssistant={isAssistant}>
          <div
            className={`prose prose-sm max-w-none ${
              isAssistant ? 'prose-neutral dark:prose-invert' : 'prose-primary'
            }`}
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <div className="m-0">{children}</div>,
                // @ts-ignore
                code({ className, children, inline }: CodeComponentProps) {
                  if (inline) {
                    return <code className={className}>{children}</code>;
                  }
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  const value = String(children).replace(/\n$/, '');
                  return <CodeBlock language={language} value={value} />;
                },
              }}
            >
              {processedContent}
            </ReactMarkdown>
          </div>
        </ChatBubble>
      )}
    </motion.div>
  );
}

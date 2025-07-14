'use client';

import { useChat } from 'ai/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Info, Send, Sparkles, X } from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useIsMobile } from '@/app/lib/hooks';
import { cn } from '@/app/lib/utils';

import { AnimatedMarkdown } from './AnimatedMarkdown';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface Source {
  type: 'project' | 'experience' | 'education' | 'media';
  title: string;
  description?: string;
  date?: string;
  url?: string;
}

interface StructuredResponse {
  response: {
    content: string;
    sources: Source[];
    confidence: number;
    isRelevant: boolean;
  };
}

interface ValidationState {
  isValid: boolean;
  message?: string;
}

// Memoized chat bubble component
const ChatBubble = memo(
  ({
    children,
    isAssistant,
    confidence,
  }: {
    children: React.ReactNode;
    isAssistant: boolean;
    confidence?: number;
  }) => {
    const getConfidenceIndicator = (confidence?: number) => {
      if (!confidence) return null;
      if (confidence >= 0.8) return 'border-l-4 border-l-green-500';
      if (confidence >= 0.6) return 'border-l-4 border-l-yellow-500';
      return 'border-l-4 border-l-red-500';
    };

    return (
      <div
        className={cn(
          'relative px-3 py-2 text-sm transition-all duration-200',
          isAssistant
            ? cn(
                'bg-muted text-foreground border border-border rounded-lg shadow-sm',
                getConfidenceIndicator(confidence)
              )
            : cn(
                'bg-primary text-primary-foreground',
                'rounded-2xl rounded-br-md shadow-md border border-primary/20',
                'font-medium'
              )
        )}
      >
        {children}
      </div>
    );
  }
);
ChatBubble.displayName = 'ChatBubble';

// Memoized loading indicator
const LoadingIndicator = memo(() => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%] mr-auto ml-0">
        <div className="rounded-lg bg-muted px-3 py-2 border border-border shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map(delay => (
                <motion.span
                  key={delay}
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: isMobile ? 0.8 : 1,
                    repeat: Infinity,
                    delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm font-medium">Thinking...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
LoadingIndicator.displayName = 'LoadingIndicator';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>({ isValid: true });
  const [sessionId] = useState(() => {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 7);
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/perplexity',
    id: sessionId,
    streamProtocol: 'text',
    onError: error => {
      console.error('Chat error:', error);
      setValidationState({
        isValid: false,
        message: 'An error occurred. Please try again.',
      });
    },
    onResponse: response => {
      if (response.status === 400) {
        setValidationState({
          isValid: false,
          message: "Please ask questions about Vishrut's professional work.",
        });
      }
    },
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Combined useEffect for better performance
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
    } else {
      scrollToBottom();
    }
  }, [isOpen, setMessages, scrollToBottom]);

  // Memoized response parser
  const parseResponse = useCallback((content: string): StructuredResponse | null => {
    try {
      const parsed = JSON.parse(content);
      if (parsed.response?.content) {
        return {
          response: {
            ...parsed.response,
            content: parsed.response.content.replace(/\*\*([^*]+)\*\*/g, '**$1**'),
          },
        };
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Memoized validation patterns
  const offTopicPatterns = useMemo(
    () => [
      /\b(private|family|relationship|age|salary|money|politics|religion)\b/i,
      /\b(where do you live|are you single|what do you think about|how old)\b/i,
      /\b(chatgpt|openai|help me with|can you|general question)\b/i,
    ],
    []
  );

  const handleInputValidation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValidationState({ isValid: true });

      if (offTopicPatterns.some(pattern => pattern.test(value))) {
        setValidationState({
          isValid: false,
          message:
            "Let's keep things professional but fun! Ask about Vishrut's work, interests, or experiences.",
        });
      }

      handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
    },
    [handleInputChange, offTopicPatterns]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validationState.isValid) {
        return;
      }
      handleSubmit(e);
    },
    [validationState.isValid, handleSubmit]
  );

  // Memoized animation variants
  const buttonVariants = useMemo(
    () => ({
      closed: { scale: 0, opacity: 0 },
      open: { scale: 1, opacity: 1 },
    }),
    []
  );

  const chatVariants = useMemo(
    () => ({
      closed: {
        opacity: 0,
        scale: 0.95,
        y: isMobile ? 20 : 10,
        transition: { duration: 0.2 },
      },
      open: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: 'spring' as const,
          stiffness: 300,
          damping: 30,
        },
      },
    }),
    [isMobile]
  );

  return (
    <div className="fixed right-0 bottom-20 z-[100] w-full px-4 md:right-4 md:bottom-4 md:w-auto md:px-0">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            variants={buttonVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.2 }}
            className="flex w-full justify-end md:w-auto"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsOpen(true)}
                    className={cn(
                      'group h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl',
                      'bg-primary hover:bg-primary/90',
                      'border border-border',
                      'hover:scale-105 active:scale-100',
                      'flex items-center justify-center'
                    )}
                  >
                    <div className="flex items-center justify-center">
                      <Sparkles className="h-5 w-5 shrink-0 text-primary-foreground" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-popover">
                  <p className="text-sm">Ask me about Vishrut!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ) : (
          <motion.div
            variants={chatVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex w-full flex-col rounded-lg border bg-card shadow-lg md:w-96"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-4 w-4 shrink-0 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Chat with Vishrut</h3>
                  <p className="text-muted-foreground text-xs">
                    Ask about work, projects, or interests
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex h-96 flex-col overflow-y-auto p-4 scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/30">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Info className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm">Start a conversation</h3>
                    <p className="text-muted-foreground text-xs max-w-[280px] leading-relaxed">
                      Ask me anything about Vishrut's work, projects, or experiences!
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col min-h-0 flex-1">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => {
                    const structuredResponse =
                      message.role === 'assistant' ? parseResponse(message.content) : null;
                    const isLastMessage = index === messages.length - 1;

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            type: 'spring' as const,
                            stiffness: isMobile ? 300 : 500,
                            damping: isMobile ? 25 : 30,
                            delay: 0.1,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                          scale: 0.95,
                          transition: { duration: 0.2 },
                        }}
                        className={cn(
                          'flex w-full',
                          message.role === 'user' ? 'justify-end' : 'justify-start',
                          index > 0 && 'mt-3',
                          isLastMessage && 'mb-2'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[85%]',
                            message.role === 'assistant' ? 'mr-auto ml-0' : 'mr-0 ml-auto'
                          )}
                        >
                          <ChatBubble
                            isAssistant={message.role === 'assistant'}
                            confidence={structuredResponse?.response?.confidence}
                          >
                            {message.role === 'assistant' && structuredResponse ? (
                              <div className="space-y-1">
                                <AnimatedMarkdown
                                  content={structuredResponse.response.content}
                                  isAssistant={true}
                                />
                                {structuredResponse.response.sources?.length > 0 && (
                                  <div className="mt-1.5 border-t border-border/50 pt-1.5">
                                    <p className="mb-2 text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                      Sources
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {structuredResponse.response.sources
                                        .slice(0, 3)
                                        .map((source, sourceIndex) => (
                                          <motion.a
                                            key={source.url || source.title}
                                            href={source.url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{
                                              opacity: 1,
                                              scale: 1,
                                              transition: { delay: 0.3 + sourceIndex * 0.1 },
                                            }}
                                            className={cn(
                                              'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5',
                                              'text-xs font-medium transition-colors duration-200',
                                              'bg-background/80 border-border text-foreground',
                                              'hover:bg-accent hover:text-accent-foreground hover:shadow-sm',
                                              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1'
                                            )}
                                          >
                                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate max-w-[120px]">
                                              {source.title}
                                            </span>
                                          </motion.a>
                                        ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="leading-6">
                                <AnimatedMarkdown
                                  content={message.content}
                                  isAssistant={message.role === 'assistant'}
                                />
                              </div>
                            )}
                          </ChatBubble>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {isLoading && <LoadingIndicator />}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <motion.form
              onSubmit={handleFormSubmit}
              className="border-t bg-background/98 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <div className="relative flex-1">
                    <textarea
                      value={input}
                      onChange={handleInputValidation}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleFormSubmit(e);
                        }
                      }}
                      placeholder="Ask me anything about Vishrut!"
                      rows={1}
                      className={cn(
                        'w-full min-w-0 flex-1 resize-none overflow-hidden',
                        'rounded-2xl border bg-background px-4 py-3 pr-12 text-sm',
                        'ring-offset-background placeholder:text-muted-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        'transition-all duration-200 shadow-sm',
                        'max-h-32 leading-relaxed scrollbar-thin',
                        !validationState.isValid &&
                          'border-destructive focus-visible:ring-destructive'
                      )}
                      style={{ minHeight: '52px' }}
                      disabled={isLoading}
                    />
                    <div className="absolute right-2 bottom-2">
                      <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim() || !validationState.isValid}
                        className={cn(
                          'relative h-8 w-8 rounded-xl shadow-sm',
                          'bg-primary hover:bg-primary/90 disabled:bg-muted disabled:opacity-50',
                          'transition-all duration-200 hover:scale-105 active:scale-95'
                        )}
                      >
                        {isLoading ? (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          </motion.div>
                        ) : (
                          <Send className="h-3.5 w-3.5 text-primary-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                {!validationState.isValid && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-1 text-destructive text-xs font-medium"
                  >
                    {validationState.message}
                  </motion.div>
                )}
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

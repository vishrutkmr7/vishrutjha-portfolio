'use client';

import { useChat } from 'ai/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useIsMobile } from '@/app/lib/hooks';
import { cn } from '@/app/lib/utils';

import { AnimatedMarkdown } from './AnimatedMarkdown';
import { Button } from './ui/button';
import { GlassCard, GlassMessageBubble } from './ui/glass-card';
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

// Message bubble component
const MessageBubble = memo(
  ({ children, isUser }: { children: React.ReactNode; isUser: boolean }) =>
    isUser ? (
      <div className="ml-auto w-fit max-w-[85%] break-words rounded-2xl bg-primary px-3.5 py-2 text-sm text-primary-foreground shadow-sm md:max-w-[75%]">
        {children}
      </div>
    ) : (
      <GlassMessageBubble className="mr-auto w-fit max-w-[85%] break-words rounded-2xl px-3.5 py-2 text-sm text-foreground md:max-w-[75%]">
        {children}
      </GlassMessageBubble>
    )
);
MessageBubble.displayName = 'MessageBubble';

// Loading indicator
const LoadingIndicator = memo(() => {
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  return (
    <GlassMessageBubble className="mr-auto w-fit max-w-[85%] rounded-2xl px-3.5 py-2.5 md:max-w-[75%]">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 0.15, 0.3].map(delay => (
            <motion.div
              key={delay}
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={
                prefersReducedMotion
                  ? { opacity: 0.7 }
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 1, 0.4],
                    }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 1.2,
                repeat: prefersReducedMotion ? 0 : Infinity,
                delay: prefersReducedMotion ? 0 : delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Thinking...</span>
      </div>
    </GlassMessageBubble>
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
          message: "I'd prefer to keep our conversation focused on topics I can help with.",
        });
      }
    },
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, []);

  // Combined useEffect for better performance
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
    } else {
      scrollToBottom();
    }
  }, [isOpen, setMessages, scrollToBottom]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight]);

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

  // Memoized validation patterns - only block truly inappropriate content
  const offTopicPatterns = useMemo(
    () => [
      /\b(salary|income|wage|bank account|social security|password|credit card)\b/i,
      /\b(exact address|home address|phone number|personal email)\b/i,
    ],
    []
  );

  const handleInputValidation = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setValidationState({ isValid: true });

      if (offTopicPatterns.some(pattern => pattern.test(value))) {
        setValidationState({
          isValid: false,
          message:
            'Please avoid sharing sensitive personal information like financial details or addresses.',
        });
      }

      handleInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    },
    [handleInputChange, offTopicPatterns]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validationState.isValid || !input.trim() || isLoading) {
        return;
      }
      handleSubmit(e);
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    },
    [validationState.isValid, handleSubmit, input, isLoading]
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
    <div className="fixed right-4 bottom-4 z-[100] w-[calc(100vw-2rem)] md:w-auto">
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
                      'group h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl',
                      'bg-gradient-to-br from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85',
                      'border border-border/50',
                      'hover:scale-110 active:scale-100',
                      'flex items-center justify-center'
                    )}
                  >
                    <MessageCircle className="h-6 w-6 shrink-0 text-primary-foreground transition-transform group-hover:scale-110" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-[200px] bg-popover">
                  <p className="text-sm">Chat with AI about Vishrut</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ) : (
          <GlassCard
            as={motion.div}
            variants={chatVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex w-full flex-col overflow-hidden rounded-2xl shadow-2xl md:w-[400px]"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-background/40 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-md">
                  <MessageCircle className="h-5 w-5 shrink-0 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Ask About Vishrut</h3>
                  <p className="text-muted-foreground text-xs">
                    Powered by Perplexity Sonar
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-9 w-9 rounded-full hover:bg-muted/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div
              className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/30 flex h-[400px] flex-col gap-2.5 overflow-y-auto scroll-smooth p-4 md:h-[450px]"
              style={{
                background: `linear-gradient(
                     to bottom,
                     rgb(var(--bg-start-rgb) / 0.03) 0%,
                     rgb(var(--bg-start-rgb) / 0.01) 40%,
                     rgb(var(--bg-end-rgb) / 0.01) 62%,
                     rgb(var(--bg-end-rgb) / 0.03) 100%
                   )`,
              }}
            >
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center space-y-4 px-6 text-center">
                  <GlassMessageBubble
                    as={motion.div}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  >
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </GlassMessageBubble>
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <h3 className="font-semibold text-base">Welcome!</h3>
                    <p className="max-w-[280px] text-muted-foreground text-sm leading-relaxed">
                      I'm an AI assistant powered by Perplexity Sonar. Ask me anything about Vishrut's work, projects, skills, or experiences—whether it's on this website, LinkedIn, or other sources online.
                    </p>
                  </motion.div>
                </div>
              )}

              {messages.map(message => {
                const structuredResponse =
                  message.role === 'assistant' ? parseResponse(message.content) : null;
                const isUser = message.role === 'user';
                const content = structuredResponse?.response?.content || message.content;

                return (
                  <MessageBubble key={message.id} isUser={isUser}>
                    <AnimatedMarkdown content={content} isAssistant={!isUser} />
                  </MessageBubble>
                );
              })}

              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="border-t border-border/50 bg-background/60 p-4 backdrop-blur-md">
              <form onSubmit={handleFormSubmit} className="space-y-2">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputValidation}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleFormSubmit(e);
                      }
                    }}
                    placeholder="Ask me anything about Vishrut..."
                    rows={1}
                    className={cn(
                      'w-full resize-none overflow-hidden rounded-2xl border px-4 py-3 pr-12 text-sm',
                      'bg-background/80 placeholder:text-muted-foreground',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
                      'shadow-sm transition-all duration-200 hover:border-border',
                      'scrollbar-thin max-h-32 leading-relaxed',
                      !validationState.isValid && 'border-destructive focus-visible:ring-destructive'
                    )}
                    style={{ minHeight: '48px' }}
                    disabled={isLoading}
                  />
                  <div className="-translate-y-1/2 absolute top-1/2 right-2">
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || !input.trim() || !validationState.isValid}
                      className={cn(
                        'h-9 w-9 rounded-full shadow-md',
                        'bg-primary hover:bg-primary/90 disabled:bg-muted disabled:opacity-50',
                        'transition-all duration-200 hover:scale-105 active:scale-95'
                      )}
                    >
                      {isLoading ? (
                        <motion.div
                          className="flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <motion.div
                            className="h-2 w-2 rounded-full bg-primary-foreground"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        </motion.div>
                      ) : (
                        <Send className="h-4 w-4 text-primary-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                {!validationState.isValid && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-1 text-destructive text-xs"
                  >
                    {validationState.message}
                  </motion.div>
                )}
              </form>
            </div>
          </GlassCard>
        )}
      </AnimatePresence>
    </div>
  );
}

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
    const getConfidenceColor = (confidence?: number) => {
      if (!confidence) return 'bg-muted';
      if (confidence >= 0.8) return 'bg-green-500/10 border-green-500/20';
      if (confidence >= 0.6) return 'bg-yellow-500/10 border-yellow-500/20';
      return 'bg-red-500/10 border-red-500/20';
    };

    return (
      <div
        className={cn(
          'relative max-w-[80%] rounded-lg p-3 text-sm transition-all duration-200',
          isAssistant
            ? cn('bg-muted text-foreground', getConfidenceColor(confidence))
            : 'bg-primary text-primary-foreground'
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
      <div className="max-w-[80%] rounded-lg bg-muted p-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 0.2, 0.4].map(delay => (
              <motion.span
                key={delay}
                className="h-1 w-1 rounded-full bg-foreground/50"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: isMobile ? 0.8 : 1,
                  repeat: Infinity,
                  delay,
                }}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">Thinking</span>
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
                      'bg-gradient-to-tr from-primary via-primary to-primary/90 hover:from-primary/95 hover:via-primary hover:to-primary',
                      'dark:from-primary dark:via-primary dark:to-primary/90 dark:hover:from-primary/95 dark:hover:via-primary dark:hover:to-primary',
                      'bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95',
                      'border border-primary/20 dark:border-primary/20',
                      'relative overflow-hidden',
                      'hover:scale-105 active:scale-100',
                      'zoom-in-95 animate-in duration-200',
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
            className="flex w-full flex-col rounded-lg border bg-background shadow-lg md:w-96"
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
            <div className="flex h-96 flex-col space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Info className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">
                    Ask me anything about Vishrut's work, projects, or experiences!
                  </p>
                </div>
              )}

              <AnimatePresence initial={false}>
                {messages.map(message => {
                  const structuredResponse =
                    message.role === 'assistant' ? parseResponse(message.content) : null;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: 'spring' as const,
                          stiffness: isMobile ? 300 : 500,
                          damping: isMobile ? 25 : 30,
                        },
                      }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <ChatBubble
                        isAssistant={message.role === 'assistant'}
                        confidence={structuredResponse?.response?.confidence}
                      >
                        {message.role === 'assistant' && structuredResponse ? (
                          <div className="space-y-2">
                            <AnimatedMarkdown
                              content={structuredResponse.response.content}
                              isAssistant={true}
                            />
                            {structuredResponse.response.sources?.length > 0 && (
                              <div className="mt-2 border-t pt-2">
                                <p className="mb-1 text-muted-foreground text-xs">Sources:</p>
                                <div className="flex flex-wrap gap-1">
                                  {structuredResponse.response.sources.slice(0, 3).map(source => (
                                    <a
                                      key={source.url || source.title}
                                      href={source.url || '#'}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs transition-colors hover:bg-muted/80"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      {source.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <AnimatedMarkdown
                            content={message.content}
                            isAssistant={message.role === 'assistant'}
                          />
                        )}
                      </ChatBubble>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <motion.form
              onSubmit={handleFormSubmit}
              className="border-t bg-background/50 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
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
                      placeholder="Curious about Vishrut? Ask away! ✨"
                      rows={1}
                      className={cn(
                        'w-full min-w-0 flex-1 resize-none overflow-hidden',
                        'rounded-2xl border bg-background/50 px-4 py-3 text-sm',
                        'ring-offset-background placeholder:text-muted-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        'transition-all duration-200',
                        'max-h-32',
                        !validationState.isValid &&
                          'border-red-500/50 focus-visible:ring-red-500/50'
                      )}
                      style={{ minHeight: '44px' }}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim() || !validationState.isValid}
                    className="relative h-11 w-11 rounded-2xl bg-[#0A84FF] hover:bg-[#0A84FF]/90 disabled:bg-muted disabled:opacity-50"
                  >
                    {isLoading ? (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-[#0A84FF]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="h-1.5 w-1.5 rounded-full bg-white"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.div>
                    ) : (
                      <Send className="h-4 w-4 text-white" />
                    )}
                  </Button>
                </div>
                {!validationState.isValid && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 text-red-500 text-xs"
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

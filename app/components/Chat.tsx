'use client';

import { useChat } from 'ai/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Info, Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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

function ChatBubble({
  children,
  isAssistant,
  confidence,
}: {
  children: React.ReactNode;
  isAssistant: boolean;
  confidence?: number;
}) {
  const getConfidenceColor = (confidence?: number) => {
    if (!confidence || !isAssistant) return null;
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative">
      <div className={cn('w-fit max-w-[85%]', isAssistant ? 'mr-auto ml-0' : 'mr-0 ml-auto')}>
        {children}
      </div>
      {isAssistant && confidence && (
        <div
          className={cn(
            '-bottom-1 absolute left-4 h-1 w-1 rounded-full',
            getConfidenceColor(confidence)
          )}
        />
      )}
    </div>
  );
}

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

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
    }
  }, [isOpen, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]); // Scroll on new messages

  const parseResponse = (content: string): StructuredResponse | null => {
    try {
      // If it's already a JSON string, parse it
      const parsed = JSON.parse(content);
      if (parsed.response?.content) {
        // Ensure markdown formatting is preserved
        return {
          response: {
            ...parsed.response,
            // Convert **text** to proper markdown bold syntax if not already
            content: parsed.response.content.replace(/\*\*([^*]+)\*\*/g, '**$1**'),
          },
        };
      }
      return null;
    } catch {
      // If it's not JSON, return null
      return null;
    }
  };

  const handleInputValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Reset validation state when input changes
    setValidationState({ isValid: true });

    // Basic client-side validation for obviously off-topic queries
    const offTopicPatterns = [
      /\b(private|family|relationship|age|salary|money|politics|religion)\b/i,
      /\b(where do you live|are you single|what do you think about|how old)\b/i,
      /\b(chatgpt|openai|help me with|can you|general question)\b/i,
    ];

    if (offTopicPatterns.some(pattern => pattern.test(value))) {
      setValidationState({
        isValid: false,
        message:
          "Let's keep things professional but fun! Ask about Vishrut's work, interests, or experiences.",
      });
    }

    handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validationState.isValid) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="fixed right-0 bottom-20 z-[100] w-full px-4 md:right-4 md:bottom-4 md:w-auto md:px-0">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
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
                      'after:absolute after:inset-0 after:bg-gradient-to-tr after:from-white/10 after:via-transparent after:to-transparent after:content-[""]',
                      'hover:scale-105 active:scale-100',
                      'zoom-in-95 animate-in duration-200'
                    )}
                  >
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent_70%)]" />
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 opacity-30"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.4),transparent_60%)]" />
                    </motion.div>
                    <Sparkles
                      className={cn(
                        'relative z-10 h-6 w-6 transition-transform duration-300 group-hover:scale-110',
                        'fill-current stroke-[1.75]',
                        'text-primary-foreground',
                        'drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]',
                        'brightness-110 filter'
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="font-medium text-sm">
                  <p>Ask AI about Vishrut&apos;s experience and projects</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-[75vh] w-full flex-col rounded-2xl border bg-background/95 shadow-lg backdrop-blur-sm md:h-[32rem] md:w-96"
          >
            <div className="flex items-center justify-between border-b bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full',
                    'bg-primary/10 dark:bg-white/10',
                    'relative overflow-hidden'
                  )}
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent dark:from-white/10 dark:via-white/5" />
                  <Sparkles
                    className={cn(
                      'relative z-10 h-5 w-5',
                      'fill-current stroke-[1.75]',
                      'text-primary-foreground dark:text-primary'
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="font-semibold text-base leading-none">Ask AI about Vishrut</h2>
                  <div className="flex items-center gap-1.5 pt-1.5 text-[11px] text-muted-foreground">
                    <span>Powered by</span>
                    <a
                      href="https://perplexity.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#20808D] transition-colors hover:text-[#20808D]/90"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 400 400"
                        role="img"
                        aria-label="Perplexity Logo"
                        className="text-[#20808D]"
                      >
                        <path
                          fill="currentColor"
                          d="M235.8 116.6h-37.3V22l-90.9 84.7V22h-15.1v84.7L1.6 22v94.6h-37.3v136.3h37.2v85l91-81v81h15.1v-81l91 81v-85h37.2V116.6ZM183.3 56.8v59.8h-64.1l64.1-59.8ZM16.7 56.8l64.1 59.8H16.7V56.8ZM-20.6 237.8v-106h101.2l-79.1 72.7v33.3h-22ZM16.6 211.1l75.9-69.7v95.3l-75.9 67.5v-93.1ZM183.4 304.2l-75.9-67.5v-95.3l75.9 69.7v93.1ZM220.6 237.8h-22v-33.3l-79.1-72.7h101.2v106Z"
                        />
                      </svg>
                      <span className="font-medium">Perplexity</span>
                    </a>
                    <span>Sonar Pro</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                }}
                className="h-8 w-8 hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-background/50 to-background p-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center text-muted-foreground"
                >
                  <div className="mb-2 flex items-center justify-center gap-2 text-2xl">
                    <span className="animate-wave">👋</span>
                    <span className="animate-pulse">🎵</span>
                  </div>
                  <p className="mb-2 text-sm">
                    Hey! I'm here to fill you in on everything about Vishrut!
                  </p>
                  <p className="text-muted-foreground/80 text-xs">
                    From his tech projects to his favorite Travis Scott tracks, I've got the inside
                    scoop. What would you like to know? ✨
                  </p>
                </motion.div>
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
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        },
                      }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'user' ? (
                        <ChatBubble isAssistant={false}>
                          <div
                            className={cn(
                              'whitespace-pre-wrap text-sm leading-relaxed',
                              'rounded-[20px] bg-primary px-4 py-2.5 text-primary-foreground',
                              'relative',
                              'before:absolute before:right-[-8px] before:bottom-0 before:h-[20px] before:w-[15px] before:rounded-bl-[16px] before:bg-primary before:content-[""]',
                              'after:absolute after:right-[-20px] after:bottom-0 after:h-[20px] after:w-[20px] after:rounded-bl-[10px] after:border-transparent after:border-b after:border-l after:bg-background after:content-[""]'
                            )}
                          >
                            {message.content}
                          </div>
                        </ChatBubble>
                      ) : structuredResponse ? (
                        <div className="max-w-[90%] space-y-3">
                          <ChatBubble
                            isAssistant={true}
                            confidence={structuredResponse.response.confidence}
                          >
                            <div
                              className={cn(
                                'prose prose-sm max-w-none',
                                'prose-neutral dark:prose-invert'
                              )}
                            >
                              <AnimatedMarkdown
                                content={structuredResponse.response.content}
                                isAssistant={true}
                              />
                            </div>
                          </ChatBubble>
                          {structuredResponse.response.sources.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="space-y-2"
                            >
                              <p className="font-medium text-muted-foreground text-xs">Sources:</p>
                              <div className="grid gap-2">
                                {structuredResponse.response.sources.map((source, index) => (
                                  <motion.div
                                    key={`${source.title}-${source.url || source.type}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.1 * (index + 1) }}
                                    className="flex items-start gap-2 rounded bg-muted/50 p-2 text-xs"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium">{source.title}</p>
                                      {source.description && (
                                        <p className="mt-0.5 text-muted-foreground">
                                          {source.description}
                                        </p>
                                      )}
                                      {source.date && (
                                        <p className="mt-0.5 text-muted-foreground">
                                          {source.date}
                                        </p>
                                      )}
                                    </div>
                                    {source.url && (
                                      <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/90"
                                      >
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                          {structuredResponse && !structuredResponse.response.isRelevant && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="rounded-lg border border-yellow-300/30 bg-yellow-100/20 p-3 text-sm text-yellow-300"
                            >
                              <Info className="mr-2 inline h-4 w-4" />
                              Let's focus on Vishrut's professional background. Ask about projects,
                              skills, or experience.
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <ChatBubble isAssistant={true}>
                          <div className="rounded-lg bg-muted p-3">
                            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                          </div>
                        </ChatBubble>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.span
                          className="h-1 w-1 rounded-full bg-foreground/50"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="h-1 w-1 rounded-full bg-foreground/50"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                          className="h-1 w-1 rounded-full bg-foreground/50"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                      <span className="text-muted-foreground text-sm">Thinking</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
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
                      onChange={e => {
                        handleInputValidation(e);
                        // Auto-adjust height
                        e.target.style.height = 'inherit';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
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
                      style={{
                        minHeight: '44px',
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="icon"
                    className={cn(
                      'relative mb-[3px] h-9 w-9 self-end overflow-hidden rounded-full transition-all duration-300',
                      validationState.isValid && input.length > 0
                        ? 'bg-[#0A84FF] after:absolute after:inset-0 after:scale-0 after:rounded-full after:bg-white/10 after:transition-transform after:duration-300 after:content-[""] hover:bg-[#0A84FF]/90 hover:after:scale-100'
                        : 'bg-muted hover:bg-muted/90'
                    )}
                    disabled={isLoading || !validationState.isValid}
                  >
                    <span
                      className={cn(
                        'font-medium text-lg transition-all duration-300',
                        validationState.isValid && input.length > 0
                          ? '-translate-y-[1px] scale-100 transform text-white'
                          : 'scale-90 text-primary-foreground/50'
                      )}
                    >
                      ↑
                    </span>
                    {isLoading && (
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

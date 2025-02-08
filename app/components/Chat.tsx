'use client';

import { useState, useEffect, useRef } from 'react';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Info, Sparkles } from 'lucide-react';

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
      <div className={cn('max-w-[85%] w-fit', isAssistant ? 'ml-0 mr-auto' : 'ml-auto mr-0')}>
        {children}
      </div>
      {isAssistant && confidence && (
        <div
          className={cn(
            'absolute -bottom-1 left-4 w-1 h-1 rounded-full',
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
    }
  }, [isOpen, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll on new messages

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
    <div className="fixed bottom-20 md:bottom-4 right-0 md:right-4 z-[100] w-full md:w-auto px-4 md:px-0">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-end w-full md:w-auto"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsOpen(true)}
                    className={cn(
                      'group h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
                      'bg-gradient-to-tr from-primary via-primary to-primary/90 hover:from-primary/95 hover:via-primary hover:to-primary',
                      'dark:from-primary dark:via-primary dark:to-primary/90 dark:hover:from-primary/95 dark:hover:via-primary dark:hover:to-primary',
                      'backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95',
                      'border border-primary/20 dark:border-primary/20',
                      'relative overflow-hidden',
                      "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-tr after:from-white/10 after:via-transparent after:to-transparent",
                      'hover:scale-105 active:scale-100',
                      'animate-in zoom-in-95 duration-200'
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
                        'relative z-10 transition-transform duration-300 group-hover:scale-110 w-6 h-6',
                        'fill-current stroke-[1.75]',
                        'text-primary-foreground',
                        'drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]',
                        'filter brightness-110'
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="text-sm font-medium">
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
            className="flex flex-col w-full md:w-96 h-[75vh] md:h-[32rem] bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between p-4 border-b bg-primary/5">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-10 h-10 flex items-center justify-center rounded-full',
                    'bg-primary/10 dark:bg-white/10',
                    'relative overflow-hidden'
                  )}
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent dark:from-white/10 dark:via-white/5" />
                  <Sparkles
                    className={cn(
                      'relative z-10 w-5 h-5',
                      'fill-current stroke-[1.75]',
                      'text-primary-foreground dark:text-primary'
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="text-base font-semibold leading-none">Ask AI about Vishrut</h2>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1.5">
                    <span>Powered by</span>
                    <a
                      href="https://perplexity.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#20808D] hover:text-[#20808D]/90 transition-colors"
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background/50 to-background">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-muted-foreground py-8"
                >
                  <div className="mb-2 text-2xl flex items-center justify-center gap-2">
                    <span className="animate-wave">👋</span>
                    <span className="animate-pulse">🎵</span>
                  </div>
                  <p className="text-sm mb-2">
                    Hey! I'm here to fill you in on everything about Vishrut!
                  </p>
                  <p className="text-xs text-muted-foreground/80">
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
                              'text-sm whitespace-pre-wrap leading-relaxed',
                              'bg-primary text-primary-foreground rounded-[20px] px-4 py-2.5',
                              'relative',
                              "before:content-[''] before:absolute before:right-[-8px] before:bottom-0 before:w-[15px] before:h-[20px] before:bg-primary before:rounded-bl-[16px]",
                              "after:content-[''] after:absolute after:right-[-20px] after:bottom-0 after:w-[20px] after:h-[20px] after:bg-background after:rounded-bl-[10px] after:border-b after:border-l after:border-transparent"
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
                              <p className="text-xs text-muted-foreground font-medium">Sources:</p>
                              <div className="grid gap-2">
                                {structuredResponse.response.sources.map((source, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.1 * (index + 1) }}
                                    className="text-xs bg-muted/50 rounded p-2 flex items-start gap-2"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium">{source.title}</p>
                                      {source.description && (
                                        <p className="text-muted-foreground mt-0.5">
                                          {source.description}
                                        </p>
                                      )}
                                      {source.date && (
                                        <p className="text-muted-foreground mt-0.5">
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
                              className="p-3 bg-yellow-100/20 rounded-lg border border-yellow-300/30 text-sm text-yellow-300"
                            >
                              <Info className="h-4 w-4 inline mr-2" />
                              Let's focus on Vishrut's professional background. Ask about projects,
                              skills, or experience.
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <ChatBubble isAssistant={true}>
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.span
                          className="w-1 h-1 bg-foreground/50 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="w-1 h-1 bg-foreground/50 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                          className="w-1 h-1 bg-foreground/50 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">Thinking</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <motion.form
              onSubmit={handleFormSubmit}
              className="p-4 border-t bg-background/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                <div className="flex gap-2 items-end">
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
                        'flex-1 min-w-0 w-full resize-none overflow-hidden',
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
                      'h-9 w-9 rounded-full transition-all duration-300 relative overflow-hidden self-end mb-[3px]',
                      validationState.isValid && input.length > 0
                        ? "bg-[#0A84FF] hover:bg-[#0A84FF]/90 after:content-[''] after:absolute after:inset-0 after:bg-white/10 after:scale-0 after:rounded-full hover:after:scale-100 after:transition-transform after:duration-300"
                        : 'bg-muted hover:bg-muted/90'
                    )}
                    disabled={isLoading || !validationState.isValid}
                  >
                    <span
                      className={cn(
                        'text-lg font-medium transition-all duration-300',
                        validationState.isValid && input.length > 0
                          ? 'text-white scale-100 transform -translate-y-[1px]'
                          : 'text-primary-foreground/50 scale-90'
                      )}
                    >
                      ↑
                    </span>
                    {isLoading && (
                      <motion.div
                        className="absolute inset-0 bg-[#0A84FF] flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 bg-white rounded-full"
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
                    className="text-xs text-red-500 px-4"
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

'use client';

import { useState, useEffect } from 'react';

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

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>({ isValid: true });
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

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

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
    }
  }, [isOpen, setMessages]);

  const parseResponse = (content: string): StructuredResponse | null => {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  };

  const handleInputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Reset validation state when input changes
    setValidationState({ isValid: true });

    // Basic client-side validation for obviously off-topic queries
    const offTopicPatterns = [
      /\b(personal|private|family|relationship|age|salary|money|politics|religion)\b/i,
      /\b(where do you live|are you single|what do you think about|how old)\b/i,
      /\b(chatgpt|openai|help me with|can you|general question)\b/i,
    ];

    if (offTopicPatterns.some(pattern => pattern.test(value))) {
      setValidationState({
        isValid: false,
        message:
          "Please keep questions focused on Vishrut's professional background and technical work.",
      });
    }

    handleInputChange(e);
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
                    <span>Sonar</span>
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
                  <div className="mb-2 text-2xl">👋</div>
                  <p className="text-sm mb-1">Hi! I'm Vishrut's AI assistant.</p>
                  <p className="text-xs">
                    Ask me anything about his experience, projects, or skills!
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
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={cn(
                          'max-w-[90%] space-y-2 relative',
                          message.role === 'user'
                            ? "bg-primary text-primary-foreground rounded-[20px] px-4 py-2.5 before:content-[''] before:absolute before:right-[-8px] before:bottom-0 before:w-[15px] before:h-[20px] before:bg-primary before:rounded-bl-[16px] after:content-[''] after:absolute after:right-[-20px] after:bottom-0 after:w-[20px] after:h-[20px] after:bg-background after:rounded-bl-[10px] after:border-b after:border-l after:border-transparent"
                            : ''
                        )}
                      >
                        {message.role === 'user' ? (
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </p>
                        ) : structuredResponse ? (
                          <div className="space-y-3">
                            <div className="bg-muted rounded-[20px] px-4 py-2.5">
                              <AnimatedMarkdown
                                content={structuredResponse.response.content}
                                isAssistant
                              />
                            </div>
                            {structuredResponse.response.sources.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="space-y-2"
                              >
                                <p className="text-xs text-muted-foreground font-medium">
                                  Sources:
                                </p>
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
                                Let's focus on Vishrut's professional background. Ask about
                                projects, skills, or experience.
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        )}
                      </div>
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
            </div>
            <motion.form
              onSubmit={handleFormSubmit}
              className="p-4 border-t bg-background/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <input
                    value={input}
                    onChange={handleInputValidation}
                    placeholder="Ask me anything about Vishrut..."
                    className={cn(
                      'flex-1 min-w-0 rounded-full border bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      !validationState.isValid && 'border-red-500/50 focus-visible:ring-red-500/50'
                    )}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className={cn(
                      'h-9 w-9 rounded-full transition-all duration-300 relative overflow-hidden',
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

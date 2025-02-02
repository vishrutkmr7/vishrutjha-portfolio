'use client';

import { useState } from 'react';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, ExternalLink, Info } from 'lucide-react';

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
  };
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/perplexity',
    streamProtocol: 'text',
    onError: error => {
      console.error('Chat error:', error);
    },
  });

  const parseResponse = (content: string): StructuredResponse | null => {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col w-96 h-[32rem] bg-background border rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-sm font-semibold">Chat with AI</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map(message => {
                  const structuredResponse =
                    message.role === 'assistant' ? parseResponse(message.content) : null;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[90%] space-y-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-lg p-3'
                            : ''
                        }`}
                      >
                        {message.role === 'user' ? (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        ) : structuredResponse ? (
                          <div className="space-y-3">
                            <div className="bg-muted rounded-lg p-3">
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
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.4 }}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Info className="h-3 w-3" />
                                      <span>
                                        Confidence:{' '}
                                        {Math.round(structuredResponse.response.confidence * 100)}%
                                      </span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      How confident the AI is in this response based on verified
                                      sources
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </motion.div>
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
              onSubmit={handleSubmit}
              className="p-4 border-t"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="flex-1 min-w-0 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="h-9 w-9" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

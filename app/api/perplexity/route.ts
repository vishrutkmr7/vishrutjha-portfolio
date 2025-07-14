import { generateSystemPrompt } from '@/app/lib/prompts';
import { checkQueryRelevance } from '@/app/lib/utils';
import type { ChatRequest, ChatResponse } from '@/app/types/chat.types';

export const runtime = 'edge';
const model = 'sonar-pro';

const responseSchema = {
  type: 'object',
  properties: {
    response: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        sources: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['project', 'experience', 'education', 'media'] },
              title: { type: 'string' },
              description: { type: 'string' },
              date: { type: 'string' },
              url: { type: 'string' },
            },
            required: ['type', 'title'],
          },
        },
        confidence: { type: 'number', minimum: 0, maximum: 1 },
        isRelevant: { type: 'boolean' },
      },
      required: ['content', 'sources', 'confidence', 'isRelevant'],
    },
  },
  required: ['response'],
};

// Validate message sequence to ensure proper alternation
function validateMessageSequence(messages: { role: string; content: string }[]) {
  let lastRole = 'system';
  const filteredMessages = messages.filter(msg => msg.role !== 'system');

  for (let i = 0; i < filteredMessages.length; i++) {
    const currentRole = filteredMessages[i].role;
    if (i === 0 && currentRole !== 'user') {
      return false; // First non-system message must be from user
    }
    if (lastRole === 'user' && currentRole !== 'assistant') {
      return false; // After user must come assistant
    }
    if (lastRole === 'assistant' && currentRole !== 'user') {
      return false; // After assistant must come user
    }
    lastRole = currentRole;
  }

  return lastRole === 'user'; // Must end with user message
}

// Format messages to ensure proper alternating sequence
function formatMessages(messages: { role: string; content: string }[]) {
  const systemMessages = messages.filter(msg => msg.role === 'system');
  const nonSystemMessages = messages.filter(msg => msg.role !== 'system');

  // Ensure proper alternating sequence
  const formattedNonSystem = [];
  for (let i = 0; i < nonSystemMessages.length; i++) {
    const expectedRole = i % 2 === 0 ? 'user' : 'assistant';
    formattedNonSystem.push({
      role: expectedRole,
      content: nonSystemMessages[i].content,
    });
  }

  return [
    ...systemMessages.map(msg => ({
      role: 'system' as const,
      content: msg.content,
    })),
    ...formattedNonSystem,
  ];
}

export async function POST(req: Request) {
  const { messages }: ChatRequest = await req.json();

  // Get the last few messages for context (limit to prevent token overflow)
  const recentMessages = messages.slice(-5); // Keep last 5 messages for context
  const systemPrompt = generateSystemPrompt(recentMessages);

  const lastUserMessage = messages[messages.length - 1]?.content || '';

  // Enhanced relevance check using the utility function
  const relevanceCheck = await checkQueryRelevance(lastUserMessage);

  if (!relevanceCheck.isRelevant) {
    const response: ChatResponse = {
      response: {
        content:
          relevanceCheck.reason ||
          "Please keep questions focused on Vishrut's professional background.",
        sources: [],
        confidence: 1.0,
        isRelevant: false,
      },
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Initialize messages with system prompt
  const initialMessages = [
    {
      role: 'system' as const,
      content: systemPrompt,
    },
  ];

  // Format and validate message sequence
  const formattedMessages = formatMessages([
    ...initialMessages,
    ...recentMessages.map(msg => ({
      role: msg.role as 'system' | 'user' | 'assistant',
      content: msg.content,
    })),
  ]);

  // Validate the message sequence
  if (!validateMessageSequence(formattedMessages)) {
    return new Response(
      JSON.stringify({
        error: 'Invalid message sequence. Messages must alternate between user and assistant.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.0,
      frequency_penalty: 1,
      top_p: 0.95,
      max_tokens: 1024,
      stream: false,
      response_format: {
        type: 'json_schema',
        json_schema: { schema: responseSchema },
      },
      messages: formattedMessages,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Perplexity API error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

  // Create a simple text stream
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(content));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

import { generateSystemPrompt } from '@/app/lib/prompts';
import { checkQueryRelevance } from '@/app/lib/utils';
import { ChatRequest, ChatResponse } from '@/app/types/chat.types';

export const runtime = 'edge';

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

export async function POST(req: Request) {
  const { messages, id }: ChatRequest = await req.json();

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

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-reasoning-pro',
      temperature: 0.0,
      frequency_penalty: 1,
      top_p: 0.95,
      max_tokens: 1024,
      stream: false,
      response_format: {
        type: 'json_schema',
        json_schema: { schema: responseSchema },
      },
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
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

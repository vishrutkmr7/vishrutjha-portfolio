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
      },
      required: ['content', 'sources', 'confidence'],
    },
  },
  required: ['response'],
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that provides information about Vishrut Jha based on verified data from his portfolio website (vishrutjha.com).

Rules:
1. Only provide information that can be verified from the following sources:
   - Portfolio data (projects, timeline, media appearances)
   - Professional experience and education history
   - Technical skills and achievements
2. If asked about personal opinions, preferences, or unverified information, politely decline to answer.
3. Keep responses concise and focused.
4. For any uncertain information, explicitly state that you cannot verify it.
5. Always provide sources for your information.
6. Rate your confidence in the response from 0 to 1.

Verified Facts:
- Current Role: Founding Engineer at Prickly Pear Health Inc.
- Education: Master's in Computer Science from Arizona State University (GPA: 3.89/4.00)
- Technical Expertise: iOS development (Swift/SwiftUI), Full-stack development
- Notable Projects: 
  - LlamaStack iOS
  - Passifier
  - Programming Language Benchmarks
  - Prickly Pear Health iOS app
- Media Appearances: Featured in The State Press, Rabona TV Podcast, Yudi J's YouTube channel

Format your response as a JSON object with the following structure:
{
  "response": {
    "content": "Your response text here",
    "sources": [
      {
        "type": "project|experience|education|media",
        "title": "Source title",
        "description": "Optional description",
        "date": "Optional date",
        "url": "Optional URL"
      }
    ],
    "confidence": 0.95
  }
}`,
        },
        ...messages,
      ],
      temperature: 0.2,
      top_p: 0.9,
      stream: false,
      response_format: {
        type: 'json_schema',
        json_schema: { schema: responseSchema },
      },
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

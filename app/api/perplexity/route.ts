import { getStructuredPromptData } from '@/app/lib/dataLoader';

export const runtime = 'edge';

// Add types for message history
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  id?: string; // Session ID
}

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
  const structuredData = getStructuredPromptData();

  const systemPrompt = `You are an AI assistant exclusively providing verified information about Vishrut Jha's professional background. Your knowledge comes from:

Projects:
${structuredData.projects
  .map(p => `- ${p.title} (${p.date}): ${p.description} [Technologies: ${p.tech.join(', ')}]`)
  .join('\n')}

Media Appearances:
${structuredData.media
  .map(m => `- ${m.type === 'podcast' ? '🎙️' : '📰'} ${m.title} (${m.date})`)
  .join('\n')}

Professional Timeline:
${structuredData.timeline
  .map(t => `- ${t.role} @ ${t.company} (${t.duration}): ${t.highlights}`)
  .join('\n')}

Chat Context:
${recentMessages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

Strict Rules:
1. ONLY discuss Vishrut Jha and people/organizations explicitly mentioned in the provided data
2. NEVER discuss, compare, or reference:
   - Other developers or professionals
   - General career advice
   - Industry trends or companies not related to Vishrut
   - Any person not explicitly mentioned in the data
3. Only respond to queries about:
   - Vishrut's professional experience & education
   - His technical skills & certifications
   - His portfolio projects & open-source contributions
   - His media appearances & public speaking
4. Firmly decline to answer:
   - Personal life questions
   - Questions about other people
   - Subjective opinions/advice
   - Future plans/speculations
   - Unverified third-party information
5. For off-topic requests:
   - Respond with: "I specialize in Vishrut's professional background. Let's discuss his work in iOS development, full-stack projects, or technical achievements."
6. Always:
   - Cite sources from verified data
   - Provide confidence score
   - Keep responses under 3 sentences
   - Use professional tone
   - Consider chat history context when answering

Verified Data Sources:
- Professional Experience: [...]
- Education: [...]
- Projects: [...]
- Skills: [...]`;

  const lastUserMessage = messages[messages.length - 1]?.content || '';

  // Enhanced relevance check
  const relevanceCheck = await checkQueryRelevance(lastUserMessage);

  if (!relevanceCheck.isRelevant) {
    const response = {
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
      model: 'sonar',
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

async function checkQueryRelevance(query: string) {
  // Professional terms dictionary with categories and weights
  const relevanceTerms = {
    professional: {
      weight: 1.0,
      terms: [
        'project',
        'experience',
        'skill',
        'education',
        'work',
        'role',
        'job',
        'position',
        'career',
        'achievement',
        'do',
        'did',
        'does',
        'working',
        'worked',
        'know',
        'use',
        'using',
        'used',
      ],
    },
    technical: {
      weight: 1.0,
      terms: [
        'code',
        'programming',
        'development',
        'software',
        'tech',
        'stack',
        'framework',
        'language',
        'tool',
        'platform',
        'python',
        'javascript',
        'typescript',
        'java',
        'c++',
        'swift',
        'react',
        'node',
        'aws',
        'oci',
        'cloud',
        'database',
        'api',
      ],
    },
    portfolio: {
      weight: 1.0,
      terms: [
        'portfolio',
        'github',
        'repository',
        'demo',
        'showcase',
        'implementation',
        'solution',
        'architecture',
        'project',
        'system',
        'application',
      ],
    },
    vishrutSpecific: {
      weight: 1.5, // Higher weight for Vishrut-specific terms
      terms: [
        'vishrut',
        'jha',
        'ios',
        'mobile',
        'full-stack',
        'web',
        'fdalytics',
        'ziply',
        'fiber',
        'compliance',
        'group',
        'applifly',
        'university',
        'arizona',
        'arizona state',
        'arizona state university',
        'arizona state university at tempe',
        'arizona state university at tempe, arizona',
        'arizona state university at tempe, arizona, united states',
        'panjab university',
        'panjab university chandigarh',
        'uiet chandigarh',
      ],
    },
    quantitative: {
      weight: 1.0,
      terms: [
        'how many',
        'how much',
        'when',
        'what year',
        'which companies',
        'where',
        'list',
        'count',
        'number of',
        'what',
        'who',
        'why',
        'how',
      ],
    },
    metadata: {
      weight: 1.0,
      terms: [
        'company',
        'companies',
        'technologies',
        'tools',
        'frameworks',
        'languages',
        'skills',
        'timeline',
        'duration',
        'date',
        'about',
        'tell',
        'explain',
        'describe',
      ],
    },
  };

  // Normalize query
  const normalizedQuery = query.toLowerCase().trim();

  // Check for obvious off-topic indicators
  const offTopicPatterns = [
    /\b(personal|private|family|relationship|age|salary|money|politics|religion)\b/i,
    /\b(where do you live|are you single|what do you think about|how old)\b/i,
    /\b(chatgpt|openai|general question)\b/i,
  ];

  // Special handling for company-related questions
  const companyRelatedMatch =
    /\b(what|who|how|when|where|why|tell|about)\b.*\b(fdalytics|ziply|fiber|compliance|group|applifly|university|washington)\b/i.test(
      normalizedQuery
    );
  if (companyRelatedMatch) {
    return {
      isRelevant: true,
      confidence: 1,
      reason: null,
    };
  }

  // Special handling for skill-related questions
  const skillRelatedMatch =
    /\b(know|use|work|code|program|develop|experience)\b.*\b(python|javascript|typescript|java|c\+\+|swift|react|node|aws|cloud|database|api)\b/i.test(
      normalizedQuery
    );
  if (skillRelatedMatch) {
    return {
      isRelevant: true,
      confidence: 1,
      reason: null,
    };
  }

  // Special handling for quantitative questions about professional topics
  const quantitativeMatch =
    /\b(how many|how much|when|what|which|where)\b.*\b(project|work|job|company|skill|technology|experience)\w*\b/i.test(
      normalizedQuery
    );
  if (quantitativeMatch) {
    return {
      isRelevant: true,
      confidence: 1,
      reason: null,
    };
  }

  // Calculate relevance score
  let totalScore = 0;
  let matchedTerms = 0;

  for (const [category, data] of Object.entries(relevanceTerms)) {
    const matches = data.terms.filter(term => {
      // Use word boundary for exact matches and handle multi-word terms
      const pattern = term.includes(' ')
        ? new RegExp(term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')
        : new RegExp(`\\b${term}\\b`, 'i');
      return pattern.test(normalizedQuery);
    });
    totalScore += matches.length * data.weight;
    matchedTerms += matches.length;
  }

  // More lenient threshold for relevance
  const isRelevant = totalScore >= 0.5 || matchedTerms >= 1;

  return {
    isRelevant,
    confidence: Math.min(totalScore / 3, 1), // Keep confidence for internal use
    reason: isRelevant
      ? null
      : "Please ask questions about Vishrut's professional background, his work at various companies, or his educational background.",
  };
}

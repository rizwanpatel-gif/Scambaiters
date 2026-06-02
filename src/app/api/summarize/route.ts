import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const MAX_CONTENT_LENGTH = 2000;

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: `Content too long. Max length is ${MAX_CONTENT_LENGTH} characters.` }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
    }

    const groq = new Groq({ apiKey: groqApiKey });
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: `Summarize the following content in 2-3 sentences:\n\n${content}` }],
      max_tokens: 200,
    });

    const summary = completion.choices[0]?.message?.content ?? '';
    return NextResponse.json({ summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Groq summarize error:', message);
    return NextResponse.json(
      { error: 'Failed to generate summary. Please try again later.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { chatWithAI } from '@/lib/deepseek';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { messages = [], role = 'friend' } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages required' }, { status: 400 });
    }

    const reply = await chatWithAI(messages, role);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json(
      { error: err.message || 'AI unavailable' },
      { status: 500 }
    );
  }
}
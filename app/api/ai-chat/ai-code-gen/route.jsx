import { GenAiCode, sanitizeAndParseJSON } from '@/configs/AiModel';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const prompt = await req.json();
  console.log(prompt);
  try {
    const result = await GenAiCode.sendMessage(prompt.prompt);
    const resp = result.response.text();
    console.log('Raw AI response:', resp);

    // Use the sanitization helper
    const parsedResponse = sanitizeAndParseJSON(resp);

    return NextResponse.json(parsedResponse);
  } catch (err) {
    console.error('Error processing AI response:', err);
    return NextResponse.json(
      {
        error: 'Failed to process AI response',
        details: err.message,
      },
      {
        status: 500,
      }
    );
  }
};

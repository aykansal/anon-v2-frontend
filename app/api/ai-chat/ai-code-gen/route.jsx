import { GenAiCode, sanitizeAndParseJSON } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const prompt = await req.json();
  console.log("Received Prompt:", prompt);

  try {
    const result = await GenAiCode.sendMessage(prompt.prompt);
    const resp = await result.response.text(); // Ensure response is fully read
    console.log("Raw AI Response:", resp);

    let parsedResponse;
// before that let's fix the ui issue then we'll fix the other things

    try {
      parsedResponse = sanitizeAndParseJSON(resp);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      return NextResponse.json(
        {
          error: "Invalid JSON response from AI",
          details: parseError.message,
          rawResponse: resp, // Send raw response for debugging
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedResponse);
  } catch (err) {
    console.error("Error processing AI response:", err);
    return NextResponse.json(
      {
        error: "Failed to process AI response",
        details: err.message,
      },
      { status: 500 }
    );
  }
};

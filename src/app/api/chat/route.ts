import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(request: Request) {
  const { bookName } = await request.json();

  const result = await generateText({
    model: openai("gpt-4o"),
    prompt: `Please, summarize in detail this book: ${bookName}`,
  });

  const text = result.text;

  return new Response(JSON.stringify(text), {
    headers: { "Content-Type": "application/json" },
  });
}

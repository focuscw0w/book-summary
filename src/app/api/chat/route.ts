import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

function generatePrompt(bookName: string) {
  return `
You are an expert book summarizer.

Your task is to summarize the book **"${bookName}"** using the exact following Markdown format:

# [Title of the Book]

## Overview
(Write a short overview: 2–3 concise sentences that explain the book's theme.)

## Key Ideas
List 3 key ideas in this format:
- **Key idea title:** Short explanation in one sentence.

## Summary
(Write 4 paragraphs that explain the core message of the book in your own words.)

## Memorable Quotes
> "A meaningful quote from the book."
> — Add context or a brief explanation.

⚠️ Return **only valid Markdown** in this structure. Do not include any notes, introductions, or closing remarks.
`.trim();
}

export async function POST(request: Request) {
  const { bookName } = await request.json();

  const result = await generateText({
    model: openai("gpt-4o"),
    prompt: generatePrompt(bookName),
  });

  return new Response(JSON.stringify({ markdown: result.text }), {
    headers: { "Content-Type": "application/json" },
  });
}

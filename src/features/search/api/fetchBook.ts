import { Book } from "../models/Book";

interface BookResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default async function fetchBook(
  query: string,
  maxResults: number = 10
) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: BookResponse = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error("An error occurred while fetching the book");
  }
}

import ApiProvider from "../../../provider/ApiProvider";
import { Book } from "../models/Book";

const apiProvider = new ApiProvider();

interface BookResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

export default function fetchBook(query: string, maxResults: number = 10) {
  return apiProvider.get<BookResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`
  );
}

/* export default async function fetchBook(query: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  const data = await response.json();

  return data;
}
 */

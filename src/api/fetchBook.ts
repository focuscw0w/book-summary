import ApiProvider from "../providers/ApiProvider";
import { Book } from "../models/Book";

const apiProvider = new ApiProvider();

interface BookResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

const fetchBook = (query: string, maxResults: number = 10) => {
  return apiProvider.get<BookResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`
  );
};

export default fetchBook;

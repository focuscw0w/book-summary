import ApiProvider from "../providers/ApiProvider";
import { Book } from "../models/Book";

const apiProvider = new ApiProvider();

interface BookResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

const fetchBook = (query: string) => {
    return apiProvider.get<BookResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
}

export default fetchBook;
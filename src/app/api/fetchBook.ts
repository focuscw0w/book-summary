import ApiProvider from "../providers/ApiProvider";
import { Book } from "../models/Book";

const apiProvider = new ApiProvider();

const fetchBook = (query: string) => {
    return apiProvider.get<{ items: Book[] }>(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
}

export default fetchBook;
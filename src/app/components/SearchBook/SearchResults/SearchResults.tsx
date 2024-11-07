import classes from "./SearchResults.module.css";
import { Book } from "@/app/models/Book";

interface SearchResultsProps {
  data: { items: Book[] } | undefined;
  error: unknown;
  isLoading: boolean;
}

const SearchResults = ({ data, error, isLoading }: SearchResultsProps) => {
  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  if (!data) {
    return <p>Sorry, we could not get a book from the server</p>;
  }

  return (
    <div className={classes.wrapper}>
      <ul>
        {data.items.map((book: Book) => (
          <li key={book.id} className={classes.bookItem}>
            {book.volumeInfo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

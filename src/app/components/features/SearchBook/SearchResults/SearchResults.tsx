import classes from "./SearchResults.module.css";
import { Book } from "@/app/models/Book";

import SearchItem from "../SearchItem/SearchItem";
import Spinner from "@/app/components/UI/Spinner/Spinner";

interface SearchResultsProps {
  data: { items: Book[] } | undefined;
  error: unknown;
  isLoading: boolean;
}

const SearchResults = ({ data, error, isLoading }: SearchResultsProps) => {
  if (isLoading) return <Spinner variant="Lines" color="#000000" />;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  if (!data) {
    return;
  }

  return (
    <div className={classes.wrapper}>
      <ul>
        {data.items.map((book: Book) => (
          <SearchItem bookInfo={book.volumeInfo} key={book.id} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
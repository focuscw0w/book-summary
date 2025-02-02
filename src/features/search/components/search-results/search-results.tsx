import classes from "./search-results.module.css";
import { Book } from "@/features/search/models/Book";

import SearchItem from "../search-item/search-item";
import Spinner from "@/components/UI/spinner/spinner";

interface SearchResultsProps {
  data: { items: Book[] } | undefined;
  error: unknown;
  isLoading: boolean;
}

export default function SearchResults({
  data,
  error,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) return <Spinner variant="Lines" color="#000000" />;
  if (error instanceof Error)
    return (
      <p>
        Unfortunately, we could not find your desired book. Please, try again
        later.
      </p>
    );

  if (!data) {
    return;
  }

  return (
    <div className={classes.container}>
      <ul>
        {data.items.map((book: Book) => (
          <SearchItem bookInfo={book.volumeInfo} key={book.id} />
        ))}
      </ul>
    </div>
  );
}

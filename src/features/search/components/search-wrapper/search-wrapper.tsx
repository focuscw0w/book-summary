"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/features/search/hooks/useDebounce";
import fetchBook from "@/features/search/api/fetchBook";
import SearchInput from "../search-input/search-input";
import SearchResults from "../search-results/search-results";
import classes from "./search-wrapper.module.css";

export default function SearchWrapper() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data, error, isLoading } = useQuery({
    queryKey: ["books", debouncedQuery],
    queryFn: () => fetchBook(debouncedQuery, 1),
    enabled: !!debouncedQuery,
  });

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {!isLoading && data === undefined && (
        <blockquote className={classes.quote}>
          &ldquo;A room without books is like a body without a soul.&rdquo;
          <cite>&mdash; Marcus Tullius Cicero</cite>
        </blockquote>
      )}
      <SearchResults data={data} error={error} isLoading={isLoading} />
    </>
  );
}

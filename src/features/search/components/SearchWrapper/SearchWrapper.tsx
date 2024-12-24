"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchInput from "../SearchInput/SearchInput";
import SearchResults from "../SearchResults/SearchResults";

import useDebounce from "@/hooks/useDebounce";
import fetchBooks from "@/features/search/api/fetchBooks";
import classes from "./SearchWrapper.module.css";

export default function SearchWrapper() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data, error, isLoading } = useQuery({
    queryKey: ["books", debouncedQuery],
    queryFn: () => fetchBooks(debouncedQuery, 5),
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
};

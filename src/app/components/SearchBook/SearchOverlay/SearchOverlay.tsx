"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchInput from "../SearchInput/SearchInput";
import SearchResults from "../SearchResults/SearchResults";

import useDebounce from "@/app/hooks/useDebounce";
import fetchBook from "@/app/api/fetchBook";

const SearchOverlay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data, error, isLoading } = useQuery({
    queryKey: ["books", debouncedQuery],
    queryFn: () => fetchBook(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchResults data={data} error={error} isLoading={isLoading} />
    </>
  );
};

export default SearchOverlay;

"use client";

import classes from "./search-input.module.css";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
}: SearchInputProps) {
  return (
    <div>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className={classes.input}
        type="text"
        placeholder="Search a book you want..."
      />
    </div>
  );
}

"use client";

import classes from "./SearchInput.module.css";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
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
};

export default SearchInput;

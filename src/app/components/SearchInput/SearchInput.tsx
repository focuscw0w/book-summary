import classes from "./SearchInput.module.css";

export default function SearchInput() {
  return (
    <div>
      <input
        className={classes.input}
        type="text"
        placeholder="Search a book you want..."
      />
    </div>
  );
}

import { useState } from "react";
import type { SubmitEvent } from "react";

type SearchBarProps = {
  initialQuery: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
  const [text, setText] = useState(initialQuery);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(text.trim());
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Search recipes, for example chicken"
        aria-label="Search recipes"
      />
      <button type="submit" className="button button--primary">
        Search
      </button>
    </form>
  );
}

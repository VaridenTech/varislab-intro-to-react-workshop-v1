import { useFetch } from "../hooks/useFetch";

type TagFilterProps = {
  selectedTag: string;
  onSelect: (tag: string) => void;
};

export default function TagFilter({ selectedTag, onSelect }: TagFilterProps) {
  // The filter is optional: if the tags fail to load, only "All" is shown.
  const { data: tags } = useFetch<string[]>("/recipes/tags");

  return (
    <div className="tag-filter" role="group" aria-label="Filter by tag">
      <button
        type="button"
        className={selectedTag === "" ? "tag tag--active" : "tag"}
        aria-pressed={selectedTag === ""}
        onClick={() => onSelect("")}
      >
        All
      </button>

      {tags?.map((tag) => (
        <button
          key={tag}
          type="button"
          className={tag === selectedTag ? "tag tag--active" : "tag"}
          aria-pressed={tag === selectedTag}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { getJson } from "../api";

type TagFilterProps = {
  selectedTag: string;
  onSelect: (tag: string) => void;
};

export default function TagFilter({ selectedTag, onSelect }: TagFilterProps) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function loadTags() {
      try {
        const result = await getJson<string[]>("/recipes/tags");
        setTags(result);
      } catch {
        // The filter is optional: without tags the page still works.
        setTags([]);
      }
    }

    loadTags();
  }, []);

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

      {tags.map((tag) => (
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

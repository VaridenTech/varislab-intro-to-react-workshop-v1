import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getJson } from "../api";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { EmptyState, ErrorMessage, Loading } from "../components/Status";
import TagFilter from "../components/TagFilter";
import type { RecipesResponse } from "../types";

function buildRecipesPath(query: string, tag: string) {
  if (query) {
    return `/recipes/search?q=${encodeURIComponent(query)}&limit=0`;
  }

  if (tag) {
    return `/recipes/tag/${encodeURIComponent(tag)}?limit=0`;
  }

  return "/recipes?limit=0";
}

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const path = buildRecipesPath(query, tag);

  const [data, setData] = useState<RecipesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getJson<RecipesResponse>(path);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipes();
  }, [path]);

  function handleSearch(nextQuery: string) {
    setSearchParams(nextQuery ? { q: nextQuery } : {});
  }

  function handleSelectTag(nextTag: string) {
    setSearchParams(nextTag ? { tag: nextTag } : {});
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">Recipes</h1>
        <p className="page-header__lead">
          Pick a dish to see its ingredients and steps.
        </p>
      </div>

      <SearchBar key={query} initialQuery={query} onSearch={handleSearch} />
      <TagFilter selectedTag={tag} onSelect={handleSelectTag} />

      {isLoading && <Loading label="Loading recipes…" />}

      {error && <ErrorMessage message={error.message} />}

      {!isLoading && !error && data && data.recipes.length === 0 && (
        <EmptyState title="No recipes found">
          <p>Try another word, or clear the search to see everything.</p>
          <button
            type="button"
            className="button button--primary"
            onClick={() => setSearchParams({})}
          >
            Show all recipes
          </button>
        </EmptyState>
      )}

      {!isLoading && !error && data && data.recipes.length > 0 && (
        <>
          <p className="result-count">
            {data.total} recipes
            {query && ` for “${query}”`}
            {tag && ` tagged ${tag}`}
          </p>
          <div className="recipe-grid">
            {data.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

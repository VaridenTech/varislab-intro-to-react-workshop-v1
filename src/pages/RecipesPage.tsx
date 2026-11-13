import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { EmptyState, ErrorMessage, Loading } from "../components/Status";
import TagFilter from "../components/TagFilter";
import { useFetch } from "../hooks/useFetch";
import type { RecipesResponse } from "../types";

const PAGE_SIZE = 12;

function buildRecipesPath(query: string, tag: string, page: number) {
  const paging = `limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`;

  if (query) {
    return `/recipes/search?q=${encodeURIComponent(query)}&${paging}`;
  }

  if (tag) {
    return `/recipes/tag/${encodeURIComponent(tag)}?${paging}`;
  }

  return `/recipes?${paging}`;
}

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const path = buildRecipesPath(query, tag, page);

  const { data, isLoading, error } = useFetch<RecipesResponse>(path);
  const pageCount = data ? Math.ceil(data.total / PAGE_SIZE) : 1;

  function handleSearch(nextQuery: string) {
    setSearchParams(nextQuery ? { q: nextQuery } : {});
  }

  function handleSelectTag(nextTag: string) {
    setSearchParams(nextTag ? { tag: nextTag } : {});
  }

  function handlePageChange(nextPage: number) {
    const nextParams = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0 });
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
          {pageCount > 1 && (
            <Pagination
              page={page}
              pageCount={pageCount}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}

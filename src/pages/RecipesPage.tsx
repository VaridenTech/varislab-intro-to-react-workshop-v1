import { useEffect, useState } from "react";
import { getJson } from "../api";
import RecipeCard from "../components/RecipeCard";
import { ErrorMessage, Loading } from "../components/Status";
import type { RecipesResponse } from "../types";

export default function RecipesPage() {
  const [data, setData] = useState<RecipesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const result = await getJson<RecipesResponse>("/recipes?limit=0");
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipes();
  }, []);

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">Recipes</h1>
        <p className="page-header__lead">
          Pick a dish to see its ingredients and steps.
        </p>
      </div>

      {isLoading && <Loading label="Loading recipes…" />}

      {error && <ErrorMessage message={error.message} />}

      {data && (
        <>
          <p className="result-count">{data.total} recipes</p>
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

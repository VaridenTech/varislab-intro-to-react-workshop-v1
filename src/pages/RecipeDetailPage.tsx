import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ApiError, getJson } from "../api";
import { EmptyState, ErrorMessage, Loading } from "../components/Status";
import type { Recipe } from "../types";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getJson<Recipe>(`/recipes/${id}`);
        setRecipe(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (isLoading) {
    return <Loading label="Loading recipe…" />;
  }

  if (error instanceof ApiError && error.status === 404) {
    return (
      <EmptyState title="Recipe not found">
        <p>We could not find a recipe with id “{id}”.</p>
        <Link to="/recipes" className="button button--primary">
          Browse all recipes
        </Link>
      </EmptyState>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!recipe) {
    return null;
  }

  return (
    <>
      <Link to="/recipes" className="back-link">
        ← All recipes
      </Link>

      <article className="recipe-detail">
        <img
          className="recipe-detail__image"
          src={recipe.image}
          alt={recipe.name}
        />

        <div>
          <p className="recipe-detail__cuisine">
            {recipe.cuisine} · {recipe.mealType.join(", ")}
          </p>
          <div className="recipe-detail__heading">
            <h1 className="recipe-detail__title">{recipe.name}</h1>
          </div>

          <ul className="tag-list">
            {recipe.tags.map((tag) => (
              <li key={tag} className="tag tag--static">
                {tag}
              </li>
            ))}
          </ul>

          <dl className="recipe-facts">
            <div className="recipe-facts__item">
              <dt>Prep</dt>
              <dd>{recipe.prepTimeMinutes} min</dd>
            </div>
            <div className="recipe-facts__item">
              <dt>Cook</dt>
              <dd>{recipe.cookTimeMinutes} min</dd>
            </div>
            <div className="recipe-facts__item">
              <dt>Servings</dt>
              <dd>{recipe.servings}</dd>
            </div>
            <div className="recipe-facts__item">
              <dt>Difficulty</dt>
              <dd>{recipe.difficulty}</dd>
            </div>
            <div className="recipe-facts__item">
              <dt>Calories</dt>
              <dd>{recipe.caloriesPerServing}</dd>
            </div>
            <div className="recipe-facts__item">
              <dt>Rating</dt>
              <dd>
                ⭐ {recipe.rating} ({recipe.reviewCount})
              </dd>
            </div>
          </dl>
        </div>

        <div className="recipe-detail__columns">
          <section>
            <h2 className="recipe-detail__section-title">Ingredients</h2>
            <ul className="ingredient-list">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="recipe-detail__section-title">Instructions</h2>
            <ol className="instruction-list">
              {recipe.instructions.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </article>

      <nav className="recipe-nav" aria-label="More recipes">
        <Link to={`/recipes/${recipe.id + 1}`} className="button button--ghost">
          Next recipe →
        </Link>
      </nav>
    </>
  );
}

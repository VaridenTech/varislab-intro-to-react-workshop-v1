import { Link } from "react-router";
import type { Recipe } from "../types";
import { formatTotalTime } from "../utils/formatTime";
import FavoriteButton from "./FavoriteButton";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <Link to={`/recipes/${recipe.id}`} className="recipe-card__link">
        <img
          className="recipe-card__image"
          src={recipe.image}
          alt=""
          loading="lazy"
        />
        <div className="recipe-card__body">
          <p className="recipe-card__cuisine">{recipe.cuisine}</p>
          <h2 className="recipe-card__title">{recipe.name}</h2>
          <ul className="recipe-card__meta">
            <li>⭐ {recipe.rating}</li>
            <li>
              ⏱{" "}
              {formatTotalTime(recipe.prepTimeMinutes, recipe.cookTimeMinutes)}
            </li>
            <li>{recipe.difficulty}</li>
          </ul>
        </div>
      </Link>
      <FavoriteButton recipe={recipe} />
    </article>
  );
}

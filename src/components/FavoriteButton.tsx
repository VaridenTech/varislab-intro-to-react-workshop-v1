import { useFavorites } from "../context/FavoritesContext";
import type { Recipe } from "../types";

type FavoriteButtonProps = {
  recipe: Recipe;
};

export default function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(recipe.id);

  return (
    <button
      type="button"
      className={
        active ? "favorite-button favorite-button--active" : "favorite-button"
      }
      aria-pressed={active}
      aria-label={
        active
          ? `Remove ${recipe.name} from favorites`
          : `Add ${recipe.name} to favorites`
      }
      onClick={() => toggleFavorite(recipe)}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}

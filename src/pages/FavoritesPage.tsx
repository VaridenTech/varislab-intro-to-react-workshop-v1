import { Link } from "react-router";
import RecipeCard from "../components/RecipeCard";
import { EmptyState } from "../components/Status";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">Favorites</h1>
        <p className="page-header__lead">Recipes you saved on this device.</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState title="No favorites yet">
          <p>Tap the heart on a recipe to save it here.</p>
          <Link to="/recipes" className="button button--primary">
            Browse recipes
          </Link>
        </EmptyState>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
}

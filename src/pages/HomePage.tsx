import { Link, useNavigate } from "react-router";
import heroArt from "../assets/hero.svg";
import RecipeCard from "../components/RecipeCard";
import { ErrorMessage, Loading } from "../components/Status";
import { useFetch } from "../hooks/useFetch";
import type { RecipesResponse } from "../types";

// DummyJSON has 50 recipes, with ids from 1 to 50.
const RECIPE_COUNT = 50;

export default function HomePage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch<RecipesResponse>(
    "/recipes?limit=4&sortBy=rating&order=desc",
  );

  function handleSurprise() {
    const randomId = Math.floor(Math.random() * RECIPE_COUNT) + 1;
    navigate(`/recipes/${randomId}`);
  }

  return (
    <>
      <section className="hero">
        <div>
          <p className="hero__eyebrow">Aroi · อร่อย</p>
          <h1 className="hero__title">
            Find something delicious to cook tonight
          </h1>
          <p className="hero__lead">
            Browse recipes from around the world, see what you need, and follow
            the steps one by one.
          </p>
          <div className="hero__actions">
            <Link to="/recipes" className="button button--primary">
              Browse recipes
            </Link>
            <button
              type="button"
              className="button button--ghost"
              onClick={handleSurprise}
            >
              Surprise me
            </button>
          </div>
        </div>
        <img className="hero__art" src={heroArt} alt="" />
      </section>

      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Top rated</h2>
          <Link to="/recipes" className="section__link">
            See all →
          </Link>
        </div>

        {isLoading && <Loading label="Loading top recipes…" />}

        {error && <ErrorMessage message={error.message} />}

        {data && (
          <div className="recipe-grid">
            {data.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

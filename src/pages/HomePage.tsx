import { Link, useNavigate } from "react-router";
import heroArt from "../assets/hero.svg";

// DummyJSON has 50 recipes, with ids from 1 to 50.
const RECIPE_COUNT = 50;

export default function HomePage() {
  const navigate = useNavigate();

  function handleSurprise() {
    const randomId = Math.floor(Math.random() * RECIPE_COUNT) + 1;
    navigate(`/recipes/${randomId}`);
  }

  return (
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
  );
}

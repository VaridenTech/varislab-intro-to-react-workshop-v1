import { Link } from "react-router";
import heroArt from "../assets/hero.svg";

export default function HomePage() {
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
        </div>
      </div>
      <img className="hero__art" src={heroArt} alt="" />
    </section>
  );
}

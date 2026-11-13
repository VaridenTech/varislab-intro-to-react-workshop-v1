import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/logo.svg";
import { useFavorites } from "../context/FavoritesContext";

export default function Layout() {
  const { favorites } = useFavorites();

  return (
    <div className="app">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            <img className="brand__logo" src={logo} alt="" />
            <span className="brand__name">Aroi</span>
          </Link>

          <nav className="site-nav" aria-label="Main">
            <NavLink to="/" end className="site-nav__link">
              Home
            </NavLink>
            <NavLink to="/recipes" className="site-nav__link">
              Recipes
            </NavLink>
            <NavLink to="/favorites" className="site-nav__link">
              Favorites
              {favorites.length > 0 && (
                <span className="badge">{favorites.length}</span>
              )}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        Built in the Varis Lab React workshop · Recipes from DummyJSON
      </footer>
    </div>
  );
}

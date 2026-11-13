import { Link } from "react-router";
import notFoundArt from "../assets/not-found.svg";

export default function NotFoundPage() {
  return (
    <div className="status">
      <img className="status__art" src={notFoundArt} alt="" />
      <h1 className="status__title">Page not found</h1>
      <p>There is nothing cooking at this address.</p>
      <Link to="/" className="button button--primary">
        Back to home
      </Link>
    </div>
  );
}

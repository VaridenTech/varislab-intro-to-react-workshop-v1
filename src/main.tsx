import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { getJson } from "./api";
import "./styles.css";
import type { RecipesResponse } from "./types";

// Temporary: prove that the API and our types work. Removed in lesson 03.
getJson<RecipesResponse>("/recipes?limit=3").then((data) => {
  console.log(`Total recipes: ${data.total}`);
  console.table(
    data.recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      rating: recipe.rating,
    })),
  );
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

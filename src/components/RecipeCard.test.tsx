import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import FavoritesProvider from "../context/FavoritesProvider";
import type { Recipe } from "../types";
import RecipeCard from "./RecipeCard";

const recipe: Recipe = {
  id: 7,
  name: "Tom Yum Soup",
  ingredients: ["Shrimp", "Lemongrass"],
  instructions: ["Boil the broth.", "Add the shrimp."],
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  servings: 2,
  difficulty: "Easy",
  cuisine: "Thai",
  caloriesPerServing: 180,
  tags: ["Soup", "Thai"],
  userId: 1,
  image: "https://example.com/tom-yum.webp",
  rating: 4.8,
  reviewCount: 12,
  mealType: ["Dinner"],
};

function renderCard() {
  render(
    <MemoryRouter>
      <FavoritesProvider>
        <RecipeCard recipe={recipe} />
      </FavoritesProvider>
    </MemoryRouter>,
  );
}

describe("RecipeCard", () => {
  it("shows the recipe name and total time", () => {
    renderCard();

    expect(
      screen.getByRole("heading", { name: "Tom Yum Soup" }),
    ).toBeInTheDocument();
    expect(screen.getByText("⏱ 35 min")).toBeInTheDocument();
  });

  it("links to the recipe detail page", () => {
    renderCard();

    expect(screen.getByRole("link")).toHaveAttribute("href", "/recipes/7");
  });
});

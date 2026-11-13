import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "../types";
import { FavoritesContext } from "./FavoritesContext";

const STORAGE_KEY = "aroi:favorites";

function readStoredFavorites(): Recipe[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Recipe[]) : [];
  } catch {
    return [];
  }
}

type FavoritesProviderProps = {
  children: ReactNode;
};

export default function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Recipe[]>(readStoredFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id: number) {
    return favorites.some((recipe) => recipe.id === id);
  }

  function toggleFavorite(recipe: Recipe) {
    setFavorites((current) =>
      current.some((item) => item.id === recipe.id)
        ? current.filter((item) => item.id !== recipe.id)
        : [...current, recipe],
    );
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

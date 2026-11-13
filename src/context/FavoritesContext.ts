import { createContext, useContext } from "react";
import type { Recipe } from "../types";

export type FavoritesContextValue = {
  favorites: Recipe[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (recipe: Recipe) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function useFavorites() {
  const value = useContext(FavoritesContext);

  if (!value) {
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  }

  return value;
}

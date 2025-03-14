"use client";
import { createContext, useContext, ReactNode, useMemo } from "react";
import { useFavourite } from "@/hooks/users/useFavourite";

interface FavouriteContextType {
  favourites: any[];
  toggleFavourite: (productId: number) => Promise<void>;
}

const FavouriteContext = createContext<FavouriteContextType>({
  favourites: [],
  toggleFavourite: async () => {},
});

export const FavouriteProvider = ({ children }: { children: ReactNode }) => {
  const { favourites, toggleFavourite } = useFavourite();

  const value = useMemo(() => ({ favourites, toggleFavourite }), [favourites, toggleFavourite]); // ✅ Tối ưu giá trị Context

  return <FavouriteContext.Provider value={value}>{children}</FavouriteContext.Provider>;
};

// ✅ Custom Hook để sử dụng Context
export const useFavouriteContext = () => {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error("useFavouriteContext must be used within a FavouriteProvider");
  }
  return context;
};

// hooks/users/useFavourite.ts
import { useState, useEffect, useCallback } from "react";
import {
  getAllCategoriesByToken,
  addFavourite,
  deleteFavourite,
} from "@/services/favouriteService";
import {
  getFavouritesFromCookie,
  saveFavouritesToCookie,
} from "@/types/cookieUtils";

export const useFavourite = (token: string | null) => {
  const [favourites, setFavourites] = useState<any[]>([]); // Khởi tạo favourites là mảng rỗng
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const syncFavouritesToDatabase = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(""); 
      const response = await getAllCategoriesByToken(token);
      if (response && response.data && Array.isArray(response.data)) {
        setFavourites(response.data);
      } else {
        setError("No favourites found.");
      }
    } catch (err) {
      setError("Failed to sync favourites.");
      console.error("Failed to sync favourites:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      syncFavouritesToDatabase();
    }
  }, [token, syncFavouritesToDatabase]);

  const addNewFavourite = useCallback(
    async (productId: number) => {
      if (!token) {
        const updatedFavourites = [...favourites, { productId }];
        setFavourites(updatedFavourites);
        saveFavouritesToCookie(updatedFavourites);
        return;
      }

      try {
        const newFavourite = await addFavourite(productId, token);
        const updatedFavourites = [...favourites, newFavourite];
        setFavourites(updatedFavourites);
        saveFavouritesToCookie(updatedFavourites);
      } catch (err) {
        console.error("Failed to add favourite:", err);
      }
    },
    [token, favourites]
  );

  const removeFavourite = useCallback(
    async (productId: number) => {
      if (!token) {
        const updatedFavourites = favourites.filter(
          (fav) => fav.productId !== productId
        );
        setFavourites(updatedFavourites);
        saveFavouritesToCookie(updatedFavourites);
        return;
      }

      try {
        await deleteFavourite(token, productId);
        const updatedFavourites = favourites.filter(
          (fav) => fav.productId !== productId
        );
        setFavourites(updatedFavourites);
        saveFavouritesToCookie(updatedFavourites);
      } catch (err) {
        console.error("Failed to remove favourite:", err);
      }
    },
    [token, favourites]
  );

  useEffect(() => {
    const favouritesFromCookie = getFavouritesFromCookie();
    if (Array.isArray(favouritesFromCookie)) {
      setFavourites(favouritesFromCookie);
    } else {
      setFavourites([]); 
    }

    if (token) {
      syncFavouritesToDatabase();
    }
  }, [token, syncFavouritesToDatabase]);

  return {
    favourites,
    loading,
    error,
    addNewFavourite,
    removeFavourite,
  };
};

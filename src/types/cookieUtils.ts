// utils/cookieUtils.ts
import { setCookie, getCookie } from "cookies-next";

export const saveFavouritesToCookie = (favourites: FavouriteItem[]) => {
  setCookie("favourites", JSON.stringify(favourites), {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    sameSite: "strict",
  });
};

export const getFavouritesFromCookie = (): FavouriteItem[] => {
  const favourites = getCookie("favourites");
  if (!favourites) return [];

  try {
    return JSON.parse(favourites as string);
  } catch (error) {
    console.error("Error parsing favourites from cookie:", error);
    return [];
  }
};

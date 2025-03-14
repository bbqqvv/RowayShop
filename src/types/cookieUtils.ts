// utils/cookieUtils.ts
import { setCookie, getCookie } from "cookies-next";

export const saveFavouritesToCookie = (favourites: any[]) => {
  setCookie("favourites", JSON.stringify(favourites), {
    maxAge: 30 * 24 * 60 * 60,
  }); 
};

export const getFavouritesFromCookie = (): any[] => {
  const favourites = getCookie("favourites");
  try {
    return favourites ? JSON.parse(favourites as string) : [];
  } catch (error) {
    return []; 
  }
};

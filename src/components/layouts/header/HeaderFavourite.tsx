import { Heart } from "lucide-react";
import Link from "next/link";
import { useFavouriteContext } from "@/contexts/FavouriteContext";

export default function HeaderFavourite() {
  const { favourites } = useFavouriteContext();
  const favouriteCount = favourites.length;

  return (
    <Link href="/favourites" className="relative">
      <Heart className="w-5 font-semibold" />
      {favouriteCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          {favouriteCount}
        </span>
      )}
    </Link>
  );
}

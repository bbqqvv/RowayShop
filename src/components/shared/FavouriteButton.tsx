import { Heart } from "lucide-react";
import { useMemo, useCallback } from "react";
import { useFavouriteContext } from "@/contexts/FavouriteContext";

interface FavouriteButtonProps {
  productId: number;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ productId }) => {
  const { favourites, toggleFavourite } = useFavouriteContext();

  // ✅ Đảm bảo favourites luôn là mảng trước khi gọi some()
  const isFavourite = useMemo(() => Array.isArray(favourites) && favourites.some((fav) => fav.id === productId), [favourites, productId]);

  const handleToggle = useCallback(() => {
    toggleFavourite(productId);
  }, [toggleFavourite, productId]);

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-white rounded-full hover:bg-red-50 transition duration-200"
    >
      <Heart className={`w-5 h-5 ${isFavourite ? "text-red-500" : "text-gray-600"}`} />
    </button>
  );
};

export default FavouriteButton;

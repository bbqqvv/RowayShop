// components/FavouriteButton.tsx
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useFavourite } from "@/hooks/users/useFavourite";

interface FavouriteButtonProps {
  productId: number;
  token: string | null;
}

const FavouriteButton = ({ productId, token }: FavouriteButtonProps) => {
  const { favourites, addNewFavourite, removeFavourite } = useFavourite(token); // Lấy favourites từ hook
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  // Kiểm tra trạng thái yêu thích ban đầu từ danh sách favourites
  useEffect(() => {
    // Kiểm tra xem favourites có phải là mảng không trước khi gọi `.some()`
    if (Array.isArray(favourites)) {
      const isFav = favourites.some((fav) => fav.productId === productId);
      setIsFavourite(isFav);
    } else {
      setIsFavourite(false); // Nếu favourites không phải là mảng, coi là chưa yêu thích
    }
  }, [favourites, productId]);

  const handleToggleFavourite = async () => {
    // Cập nhật UI trước khi gọi API
    setIsFavourite(!isFavourite);

    try {
      if (isFavourite) {
        // Xóa khỏi cookie và CSDL
        await removeFavourite(productId);
      } else {
        // Thêm vào cookie và CSDL
        await addNewFavourite(productId);
      }
    } catch (error) {
      console.error("Error while toggling favourite:", error);
      // Khôi phục lại trạng thái ban đầu nếu có lỗi
      setIsFavourite(isFavourite);
    }
  };

  return (
    <button
      onClick={handleToggleFavourite}
      className="p-2 bg-white rounded-full hover:bg-red-50 transition duration-200"
    >
      <Heart
        className={`w-4 h-4 ${isFavourite ? "text-red-500" : "text-gray-600"}`}
      />
    </button>
  );
};

export default FavouriteButton;

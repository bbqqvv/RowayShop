import { addFavourite, getFavourites, removeFavourite } from "@/services/favouriteService";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "favourites";

export const useFavourite = () => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  /** 🔄 Lấy danh sách yêu thích từ API và lưu vào cookie */
  const fetchFavourites = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const cachedFavourites = Cookies.get(COOKIE_NAME);
      if (cachedFavourites) {
        setFavourites(JSON.parse(cachedFavourites)); // Load từ cookie trước
      }

      const response = await getFavourites(); // Gọi API lấy dữ liệu mới nhất
      setFavourites(response);
      Cookies.set(COOKIE_NAME, JSON.stringify(response), { expires: 7 }); // Lưu vào cookie
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách yêu thích:", err);
      setError("Không thể lấy danh sách yêu thích.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  /** ❤️ Thêm sản phẩm vào danh sách yêu thích */
  const addNewFavourite = useCallback(async (productId: number) => {
    try {
      const newFavourite = await addFavourite(productId);
      setFavourites((prev) => {
        const updatedFavourites = [...prev, newFavourite];
        Cookies.set(COOKIE_NAME, JSON.stringify(updatedFavourites), { expires: 7 });
        return updatedFavourites;
      });
    } catch (err) {
      console.error("❌ Lỗi khi thêm vào danh sách yêu thích:", err);
    }
  }, []);

  /** ❌ Xóa sản phẩm khỏi danh sách yêu thích */
  const removeFavouriteItem = useCallback(async (productId: number) => {
    try {
      await removeFavourite(productId);
      setFavourites((prev) => {
        const updatedFavourites = prev.filter((fav) => fav.id !== productId);
        Cookies.set(COOKIE_NAME, JSON.stringify(updatedFavourites), { expires: 7 });
        return updatedFavourites;
      });
    } catch (err) {
      console.error("❌ Lỗi khi xóa sản phẩm khỏi danh sách yêu thích:", err);
    }
  }, []);

  /** 🔄 Toggle trạng thái yêu thích */
  const toggleFavourite = useCallback(async (productId: number) => {
    try {
      if (favourites.some((fav) => fav.id === productId)) {
        await removeFavouriteItem(productId);
      } else {
        await addNewFavourite(productId);
      }
    } catch (err) {
      console.error("❌ Lỗi khi toggle yêu thích:", err);
    }
  }, [favourites, addNewFavourite, removeFavouriteItem]);

  return { favourites, loading, error, toggleFavourite, removeFavourite: removeFavouriteItem };
};

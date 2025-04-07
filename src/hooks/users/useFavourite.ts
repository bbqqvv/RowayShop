// hooks/users/useFavourite.ts

import { addFavourite, getFavourites, removeFavourite } from "@/services/favouriteService";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavouriteResponse } from "types/favourite/favourite-response.type";
import { addFav, removeFav, setFav } from "@/redux/slices/favouriteSlice"; // Redux actions

export const useFavourite = () => {
  const dispatch = useDispatch();
  const favouritesFromRedux = useSelector((state: any) => state.favourites.favourites); // Lấy dữ liệu yêu thích từ Redux

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  }); // Quản lý thông tin phân trang

  /** 🔄 Lấy danh sách yêu thích từ API */
  const fetchFavourites = useCallback(async (page: number = 0) => {
    setLoading(true);
    setError("");
    try {
      const response = await getFavourites(page);
      // Cập nhật Redux với dữ liệu yêu thích từ API
      dispatch(setFav(response.data.items));

      // Cập nhật thông tin phân trang
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        pageSize: response.data.pageSize,
      });
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách yêu thích:", err);
      setError("Không thể lấy danh sách yêu thích.");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFavourites(); 
  }, [fetchFavourites]);

  const addNewFavourite = useCallback(async (productId: number): Promise<FavouriteResponse | undefined> => {
    try {
      const newFavourite = await addFavourite(productId);
      dispatch(addFav(newFavourite)); 
      return newFavourite;
    } catch (err) {
      console.error("❌ Lỗi khi thêm vào danh sách yêu thích:", err);
      return undefined;
    }
  }, [dispatch]);

  /** ❌ Xóa sản phẩm khỏi danh sách yêu thích */
  const removeFavouriteItem = useCallback(async (productId: number) => {
    try {
      await removeFavourite(productId);
      dispatch(removeFav(productId)); // Cập nhật Redux
    } catch (err) {
      console.error("❌ Lỗi khi xóa sản phẩm khỏi danh sách yêu thích:", err);
    }
  }, [dispatch]);

  /** 🔄 Toggle trạng thái yêu thích */
  const toggleFavourite = useCallback(async (productId: number) => {
    try {
      if (favouritesFromRedux.some((fav: FavouriteResponse) => fav.id === productId)) {
        await removeFavouriteItem(productId);
      } else {
        await addNewFavourite(productId);
      }
    } catch (err) {
      console.error("❌ Lỗi khi toggle yêu thích:", err);
    }
  }, [favouritesFromRedux, addNewFavourite, removeFavouriteItem]);

  /** 🔄 Chuyển sang trang tiếp theo */
  const goToNextPage = useCallback(() => {
    if (pagination.currentPage + 1 < pagination.totalPages) {
      fetchFavourites(pagination.currentPage + 1);
    }
  }, [pagination, fetchFavourites]);

  /** 🔄 Chuyển sang trang trước */
  const goToPreviousPage = useCallback(() => {
    if (pagination.currentPage > 0) {
      fetchFavourites(pagination.currentPage - 1);
    }
  }, [pagination, fetchFavourites]);

  return {
    favourites: favouritesFromRedux, // Lấy từ Redux
    loading,
    error,
    addNewFavourite,
    toggleFavourite,
    removeFavourite: removeFavouriteItem,
    pagination,
    goToNextPage,
    goToPreviousPage,
  };
};

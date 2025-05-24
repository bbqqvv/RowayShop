import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favouriteService } from "@/services/favouriteService";
import { FavouriteResponse } from "types/favourite/favourite-response.type";
import { addFav, removeFav, setFav } from "@/redux/slices/favouriteSlice";
import { RootState } from "@/redux/store";

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

export const useFavourite = () => {
  const dispatch = useDispatch();
  const favouritesFromRedux = useSelector((state: RootState) => state.favourites.favourites);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });

  const fetchFavourites = useCallback(
    async (page: number = 0) => {
      setLoading(true);
      setError("");
      try {
        const response = await favouriteService.getFavourites(page, pagination.pageSize);
        dispatch(setFav(response.data.items));

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
    },
    [dispatch, pagination.pageSize]
  );

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const addNewFavourite = useCallback(
    async (productId: number): Promise<FavouriteResponse | undefined> => {
      setLoading(true);
      setError("");
      try {
        const newFavourite = await favouriteService.addFavourite(productId);
        dispatch(addFav(newFavourite));
        return newFavourite;
      } catch (err) {
        console.error("❌ Lỗi khi thêm vào danh sách yêu thích:", err);
        setError("Không thể thêm sản phẩm yêu thích.");
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const removeFavouriteItem = useCallback(
    async (productId: number) => {
      setLoading(true);
      setError("");
      try {
        await favouriteService.removeFavourite(productId);
        dispatch(removeFav(productId));
      } catch (err) {
        console.error("❌ Lỗi khi xóa sản phẩm khỏi danh sách yêu thích:", err);
        setError("Không thể xóa sản phẩm yêu thích.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const toggleFavourite = useCallback(
    async (productId: number) => {
      try {
        const isFav = favouritesFromRedux.some((fav: FavouriteResponse) => fav.id === productId);
        if (isFav) {
          await removeFavouriteItem(productId);
        } else {
          await addNewFavourite(productId);
        }
      } catch (err) {
        console.error("❌ Lỗi khi toggle yêu thích:", err);
      }
    },
    [favouritesFromRedux, addNewFavourite, removeFavouriteItem]
  );

  const goToNextPage = useCallback(() => {
    if (pagination.currentPage + 1 < pagination.totalPages) {
      fetchFavourites(pagination.currentPage + 1);
    }
  }, [pagination, fetchFavourites]);

  const goToPreviousPage = useCallback(() => {
    if (pagination.currentPage > 0) {
      fetchFavourites(pagination.currentPage - 1);
    }
  }, [pagination, fetchFavourites]);

  return {
    favourites: favouritesFromRedux,
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

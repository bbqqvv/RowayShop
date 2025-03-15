import { useState, useEffect, useCallback } from "react";
import { cartService } from "@/services/cartService";

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Lấy giỏ hàng từ API
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi lấy giỏ hàng");
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 🔵 Thêm sản phẩm vào giỏ hàng hoặc cập nhật số lượng
  const addItemToCart = async (productId: number, sizeName: string, color: string, quantity: number) => {
    setLoading(true);
    try {
      await cartService.addOrUpdateProduct({ productId, sizeName, color, quantity });
      fetchCart();
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Tăng số lượng sản phẩm
  const increaseItemQuantity = async (item: CartItem) => {
    setLoading(true);
    try {
      await cartService.increaseQuantity({
        productId: item.productId,
        sizeName: item.sizeName,
        color: item.color,
      });
      fetchCart();
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi tăng số lượng");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Giảm số lượng sản phẩm
  const decreaseItemQuantity = async (item: CartItem) => {
    setLoading(true);
    try {
      if (item.quantity > 1) {
        await cartService.decreaseQuantity({
          productId: item.productId,
          sizeName: item.sizeName,
          color: item.color,
        });
      } else {
        await cartService.removeProduct(item.productId, item.sizeName, item.color);
      }
      fetchCart();
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi giảm số lượng");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Xóa sản phẩm khỏi giỏ hàng
  const removeItemFromCart = async (item: CartItem) => {
    setLoading(true);
    try {
      await cartService.removeProduct(item.productId, item.sizeName, item.color);
      fetchCart();
    } catch (err) {
      setError(err instanceof Error? err.message: "Lỗi khi xóa sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Xóa toàn bộ giỏ hàng
  const clearCartItems = async () => {
    setLoading(true);
    try {
      await cartService.clearCart();
      fetchCart();
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi xóa giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    addItemToCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
    clearCartItems,
  };
};

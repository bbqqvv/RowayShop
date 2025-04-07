import { useState, useEffect, useCallback } from "react";
import { addressService } from "@/services/addressService";
import { AddressResponse } from "types/address/address-response.type";
import { AddressRequest } from "types/address/address-request.type";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<AddressResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Lấy danh sách địa chỉ từ API
  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const addressData = await addressService.getAddressesByUser();
      setAddresses(addressData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error? err.message: "Lỗi khi lấy danh sách địa chỉ");
      setAddresses(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // 🔵 Thêm địa chỉ mới
  const addAddress = async (addressData: AddressRequest) => {
    setLoading(true);
    try {
      await addressService.createAddress(addressData);
      fetchAddresses();
    } catch (err) {  
      setError(err instanceof Error? err.message:  "Lỗi khi thêm địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Cập nhật địa chỉ
  const updateAddress = async (id: number, addressData: AddressRequest) => {
    setLoading(true);
    try {
      await addressService.updateAddress(id, addressData);
      fetchAddresses();
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi cập nhật địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Xóa địa chỉ
  const removeAddress = async (id: number) => {
    setLoading(true);
    try {
      await addressService.deleteAddress(id);
      fetchAddresses();
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi xóa địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  // 🟠 Đặt địa chỉ mặc định
  const setDefaultAddress = async (id: number) => {
    setLoading(true);
    try {
      await addressService.setDefaultAddress(id);
      fetchAddresses();
    } catch (err) {
      setError(err instanceof Error? err.message:  "Lỗi khi đặt địa chỉ mặc định");
    } finally {
      setLoading(false);
    }
  };

  return {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  };
};

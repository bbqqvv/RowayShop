// src/services/addressService.ts
import apiClient from "@/apiClient";
import { AddressRequest } from "types/address/address-request.type";
import { AddressResponse } from "types/address/address-response.type";

const BASE_URL = "api/addresses";

export const addressService = {
  async getAddressesByUser(): Promise<AddressResponse[]> {
    const response = await apiClient.get(`${BASE_URL}/me`);
    return response.data?.data || [];
  },

  async getAddressById(id: number): Promise<AddressResponse> {
    const response = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data?.data;
  },

  async createAddress(addressData: AddressRequest): Promise<AddressResponse> {
    const response = await apiClient.post(BASE_URL, addressData);
    return response.data?.data;
  },

  async updateAddress(id: number, addressData: AddressRequest): Promise<AddressResponse> {
    const response = await apiClient.put(`${BASE_URL}/${id}`, addressData);
    return response.data?.data;
  },

  async deleteAddress(id: number): Promise<string> {
    const response = await apiClient.delete(`${BASE_URL}/${id}`);
    return response.data?.data;
  },

  async setDefaultAddress(id: number): Promise<AddressResponse> {
    const response = await apiClient.put(`${BASE_URL}/${id}/set-default`);
    return response.data?.data;
  },
};

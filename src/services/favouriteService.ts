import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/favourites", // Base URL
});
export const getAllCategoriesByToken = async (token: string) => {
  const response = await apiClient.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// favouriteService.ts
export const addFavourite = async (productId: number, token: string) => {
  console.log("Token farvourire: ", token);
  const response = await apiClient.post(
    "", // Thêm thông tin cần thiết vào URL (ví dụ /add)
    { productId }, // Truyền productId vào trong body request
    {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    }
  );
  return response.data;
};

export const deleteFavourite = async (token: string, productId: number) => {
  const response = await apiClient.delete(`/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

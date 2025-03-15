"use client";

import React, { useEffect, useMemo } from "react";
import { useFavourite } from "@/hooks/users/useFavourite";
import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";

const FavouritesPage = () => {
  const { token } = useAuthContext();
  const { favourites, loading, error, removeFavourite } = useFavourite();
console.log(favourites);

console.log(removeFavourite);
  // ✅ Đảm bảo danh sách yêu thích luôn là một mảng hợp lệ
  const favouriteList = useMemo(() => (Array.isArray(favourites) ? favourites : []), [favourites]);

  useEffect(() => {
    if (loading) console.log("Loading favorites...");
    if (error) console.error("Error:", error);
  }, [loading, error]);

  const handleRemove = (id: number) => {
    removeFavourite(id);
  };

  if (!token) {
    return (
      <main className="p-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-800">Your Favorite Products</h1>
        <p className="text-gray-500 mt-4">Please log in to see your favorites.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">
        Your Favorite Products
      </h1>

      {/* Loading state */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Error state */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Nếu danh sách yêu thích trống */}
      {!loading && favouriteList.length === 0 && (
        <p className="text-center text-gray-500">No favorites added yet.</p>
      )}

      {/* 🟢 Mobile View (Grid layout) */}
      {!loading && favouriteList.length > 0 && (
        <div className="sm:hidden grid grid-cols-1 gap-6">
          {favouriteList.map((fav) => (
            <div key={fav.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <a href={fav.productUrl} className="w-full">
                <div className="relative w-full h-48">
                  <Image
                    src={fav.imageUrl}
                    alt={fav.nameProduct}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </a>
              <div className="mt-4 text-center">
                <a href={fav.productUrl} className="text-lg font-semibold text-blue-600 hover:underline block">
                  {fav.nameProduct}
                </a>
                <p className="text-gray-800 font-bold mt-2">{fav.price.toLocaleString()} VND</p>
                <button
                  onClick={() => handleRemove(fav.id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🖥️ Desktop View (Table layout) */}
      {!loading && favouriteList.length > 0 && (
        <div className="hidden sm:block">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4">Image</th>
                  <th className="text-left py-3 px-4">Info</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favouriteList.map((fav) => (
                  <tr key={fav.id} className="border-b">
                    <td className="py-4 px-4 w-40">
                      <a href={fav.productUrl}>
                        <Image
                          src={fav.imageUrl}
                          alt={fav.nameProduct}
                          width={160}
                          height={160}
                          className="object-cover rounded-md"
                        />
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a href={fav.productUrl} className="text-blue-600 hover:underline">
                        {fav.nameProduct}
                      </a>
                    </td>
                    <td className="py-4 px-4 font-semibold">{fav.price.toLocaleString()} VND</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleRemove(fav.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default FavouritesPage;

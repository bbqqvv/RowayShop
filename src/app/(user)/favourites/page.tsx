"use client"; // Ensures this code is client-side only

import React, { useEffect, useMemo } from "react";
import { useFavourite } from "@/hooks/users/useFavourite";
import { useAuthContext } from "@/contexts/AuthContext";

const FavouritesPage = () => {
  const { token } = useAuthContext();
  const { favourites, loading, error, removeFavourite } = useFavourite(token);
  const favouriteList = useMemo(() => favourites, [favourites]);

  useEffect(() => {
    if (loading) {
      console.log("Loading favorites...");
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [loading, error]);

  const handleRemove = (id: number) => {
    removeFavourite(id); // Call the remove function
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">
        Your Favorite Products
      </h1>

      {/* Loading state */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Error state */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Desktop view */}
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
              {favouriteList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No favorites added yet.
                  </td>
                </tr>
              ) : (
                favouriteList.map((fav) => (
                  <tr key={fav.id} className="border-b">
                    <td className="py-4 px-4">
                      <a href={fav.productUrl}>
                        <img
                          src={fav.imageUrl}
                          alt={fav.nameProduct}
                          className="w-full h-full object-cover rounded"
                        />
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a href={fav.productUrl} className="text-blue-600">
                        {fav.nameProduct}
                      </a>
                    </td>
                    <td className="py-4 px-4">{fav.price}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleRemove(fav.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fal fa-times"></i> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default FavouritesPage;

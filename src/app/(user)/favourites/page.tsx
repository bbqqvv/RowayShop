"use client";

import React from "react";
import { Favorites } from "./components/Favorites";
import RecommendedProducts from "@/components/products/RecommendedProducts";

const FavouritesPage = () => {
  return (
    <main >
      <Favorites />
      <RecommendedProducts />
    </main>
  );
};

export default FavouritesPage;

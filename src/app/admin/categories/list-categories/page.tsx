"use client";
import { useState, useCallback } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "../components/Form";
import ListView from "../components/ListView";
import { CategoryResponse } from "types/category/category-response.type";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);

  const handleEdit = useCallback((category: CategoryResponse) => {
    setSelectedCategory(category);
  }, []);

  return (
    <main className="flex ">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Form selectedCategory={selectedCategory} />
      <ListView handleEdit={handleEdit} />
    </main>
  );
}
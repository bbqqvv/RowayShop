"use client";
import { useState, useCallback } from "react";
import Form from "./components/Form";
import ListView from "./components/ListView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Category } from "../../../../types/type";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleEdit = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  return (
    <main className="flex gap-5 mt-14">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Form selectedCategory={selectedCategory} />
      <ListView handleEdit={handleEdit} />
    </main>
  );
}
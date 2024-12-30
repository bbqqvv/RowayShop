"use client";

import { useState } from "react";
import Form from "./components/Form";
import ListView from "./components/ListView";
import { Category } from "../../../types/Category";
import { ToastContainer } from "react-toastify";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleEdit = (category: Category) => {
    setSelectedCategory(category); // Cập nhật selectedCategory khi bấm Edit
  };

  return (
    <main className="flex gap-5 mt-14">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Form selectedCategory={selectedCategory} />
      <ListView handleEdit={handleEdit} />
    </main>
  );
}

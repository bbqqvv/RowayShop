"use client";

import { useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Button } from "@nextui-org/react";
import VariantsTable from "./components/VariantsTable";

// Define the structure of product data
interface ProductData {
  title?: string;
  shortDescription?: string;
  featureImage?: string;
  imageList?: string[];
  description?: string;
  categoryId?: string;
  [key: string]: any;
}

// Define the structure of a variant
interface Variant {
  size: string[];
  color: string;
  stock: number;
  price: number;
}

export default function Page() {
  // State to store product data
  const [data, setData] = useState<ProductData>({
    featureImage: "",
    imageList: [],
    description: "",
    categoryId: "",
  });

  const [featureImage, setFeatureImage] = useState<string | null>(
    data.featureImage || null
  );
  const [imageList, setImageList] = useState<string[]>(data.imageList || []);

  const [variants, setVariants] = useState<Variant[]>([
    { size: [], color: "", stock: 0, price: 0 },
  ]);

  const [category, setCategory] = useState<string>("");

  // Handle data changes
  const handleData = (key: keyof ProductData, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleVariantChange = (
    index: number,
    key: keyof Variant,
    value: any
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [key]: value,
    };
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: [], color: "", stock: 0, price: 0 }]);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data Submitted", data, variants);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 mt-8">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-semibold text-xl">Create New Product</h1>
        <Button type="submit">Create</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 flex flex-col gap-6">
          <BasicDetails
            data={data}
            handleData={handleData}
            handleCategoryChange={handleCategoryChange}
          />
          <VariantsTable
            variants={variants}
            handleVariantChange={handleVariantChange}
            addVariant={addVariant}
            removeVariant={removeVariant}
            category={category}
          />
        </div>
        <div className="flex flex-col flex-1 gap-5 h-full">
          <Images
            data={data}
            featureImage={featureImage}
            setFeatureImage={setFeatureImage}
            imageList={imageList}
            setImageList={setImageList}
            handleData={handleData}
          />
          <Description data={data} handleData={handleData} />
        </div>
      </div>
    </form>
  );
}

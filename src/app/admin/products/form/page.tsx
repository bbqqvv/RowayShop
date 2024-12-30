"use client";
import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import VariantsTable from "./components/VariantsTable";
import { useProducts } from "@/hooks/products/useProducts";

interface ProductData {
  name?: string;
  shortDescription?: string;
  mainImageUrl?: File | null;
  secondaryImageUrls: File[]; // Ensure this is always an array
  description?: string;
  categoryId?: string;
  price?: number;
  descriptionImageUrls?: File[];
  featured?: boolean;
  sale?: boolean;
  salePercentage?: number;
  productCode?: string;
  stock?: number;
  [key: string]: any;
}

interface Variant {
  size: string[];
  color: string;
  stock: number;
  price: number;
}

export default function Page() {
  const [data, setData] = useState<ProductData>({
    name: "",
    shortDescription: "",
    mainImageUrl: null,
    secondaryImageUrls: [], // Initialize as an empty array
    description: "",
    categoryId: "",
    price: 0,
    descriptionImageUrls: [],
    featured: false,
    sale: false,
    salePercentage: 0,
    productCode: "",
    stock: 0,
  });
  const resetForm = () => {
    setData({
      name: "",
      shortDescription: "",
      mainImageUrl: null,
      secondaryImageUrls: [],
      description: "",
      categoryId: "",
      price: 0,
      descriptionImageUrls: [],
      featured: false,
      sale: false,
      salePercentage: 0,
      productCode: "",
      stock: 0,
    });
    setVariants([{ size: [], color: "", stock: 0, price: 0 }]);
    setCategory("");
  };
  const [variants, setVariants] = useState<Variant[]>([
    { size: [], color: "", stock: 0, price: 0 },
  ]);
  const [category, setCategory] = useState<string>("");

  const { loading, error, createNewProduct } = useProducts();

  const handleData = (key: keyof ProductData, value: any) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
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

  const generateFormData = () => {
    const formData = new FormData();

    // Append basic fields
    formData.append("name", data.name || "");
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("description", data.description || "");
    formData.append("productCode", data.productCode || "AUTO_GENERATED_CODE");
    formData.append("stock", data.stock?.toString() || "0");
    formData.append("price", data.price?.toString() || "0");
    formData.append("categoryId", category || "");
    formData.append("featured", data.featured ? "true" : "false");
    formData.append("sale", data.sale ? "true" : "false");
    formData.append("salePercentage", data.salePercentage?.toString() || "0");

    // Append images if available
    if (data.mainImageUrl && data.mainImageUrl instanceof File) {
      formData.append("mainImageUrl", data.mainImageUrl);
    }
    data.secondaryImageUrls.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`secondaryImageUrls[${index}]`, file);
      }
    });
    data.descriptionImageUrls?.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`descriptionImageUrls[${index}]`, file);
      }
    });

    // Append variants to FormData
    variants.forEach((variant, index) => {
      formData.append(`variants[${index}].size`, variant.size.join(","));
      formData.append(`variants[${index}].color`, variant.color);
      formData.append(`variants[${index}].price`, variant.price.toString());
      formData.append(`variants[${index}].stock`, variant.stock.toString());
    });

    return formData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading message
    toast.info("Creating product, please wait...");

    // Log the form data before submitting it
    const formData = generateFormData();
    try {
      const response = await createNewProduct(formData);
      toast.success("Product created successfully!"); // Display success message
      resetForm(); // Reset the form fields after success
    } catch (error) {
      console.error("Error creating product", error);
      toast.error("Error creating product, please try again."); // Display error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 mt-8">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-semibold text-xl">Create New Product</h1>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Create"}
        </Button>
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
            data={{
              mainImageUrl: data.mainImageUrl, // Ensure it's File | null
              secondaryImageUrls: data.secondaryImageUrls, // Ensure it's File[]
            }}
            setMainImageUrl={(file) => handleData("mainImageUrl", file)}
            setSecondaryImageUrls={(files) =>
              handleData("secondaryImageUrls", files)
            }
            handleData={handleData}
          />
          <Description data={data} handleData={handleData} />
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </form>
  );
}

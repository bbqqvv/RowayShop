"use client";
import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import VariantsTable from "./components/VariantsTable";
import { useProducts } from "@/hooks/products/useProducts";

export default function Page() {
  const [data, setData] = useState<Product>({
    id: 0,
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    productCode: "",
    featured: false,
    sale: false,
    active: true,
    salePercentage: 0,
    categoryId: 0,
    mainImageUrl: "", // Sửa thành string | File
    secondaryImageUrls: [],
    descriptionImageUrls: [],
    variants: [],
    createdAt: new Date(), // Sửa thành kiểu Date
    updatedAt: new Date(), // Sửa thành kiểu Date
  });

  const [variants, setVariants] = useState<Variant[]>([
    { id: 0, sizes: [], color: "", imageUrl: null }, // Sửa thành null để phù hợp với kiểu dữ liệu
  ]);

  const [categorySizes, setCategorySizes] = useState<{ id: number; name: string }[]>([]);

  const { loading, createNewProduct } = useProducts();

  const handleData = (key: keyof Product, value: Product[keyof Product] | null) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleCategoryChange = (categoryId: number, sizes: { id: number; name: string }[]) => {
    console.log(`handleCategoryChange - categoryId: ${categoryId}, sizes: `, sizes);
    setData((prevData) => ({ ...prevData, categoryId: categoryId }));
    setCategorySizes(sizes);
  };

  const handleVariantChange = (index: number, key: keyof Variant, value: string | File | SizeProduct[]) => {
    console.log(`handleVariantChange - index: ${index}, key: ${key}, value: `, value);
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [key]: value };
    setVariants(updatedVariants);

    // Cập nhật cả data.variants
    setData((prevData) => ({
      ...prevData,
      variants: updatedVariants,
    }));
  };

  const addVariant = () => {
    console.log('addVariant - Adding new variant');
    setVariants([
      ...variants,
      { id: variants.length, sizes: [], color: "", imageUrl: null }, // Sửa thành null để phù hợp với kiểu dữ liệu
    ]);
  };

  const removeVariant = (index: number) => {
    console.log(`removeVariant - Removing variant at index: ${index}`);
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);

    // Cập nhật cả data.variants
    setData((prevData) => ({
      ...prevData,
      variants: updatedVariants,
    }));
  };

  const generateFormData = () => {
    const formData = new FormData();
    console.log("generateFormData - Data state:", data);
    console.log("generateFormData - Variants state:", variants);

    // Basic fields
    formData.append("name", data.name || "");
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("description", data.description || "");
    formData.append("productCode", data.productCode || "AUTO_GENERATED_CODE");
    formData.append(
      "stock",
      data.variants?.reduce((sum, variant) => sum + (variant?.sizes?.reduce((sumSize, size) => sumSize + (size?.stock || 0), 0) || 0), 0).toString()
    );
    formData.append("categoryId", data.categoryId.toString());
    formData.append("featured", data.featured ? "true" : "false");
    formData.append("sale", data.sale ? "true" : "false");
    formData.append("salePercentage", (data.salePercentage || 0).toString());

    // Images
    console.log("generateFormData - Checking mainImageUrl:", data.mainImageUrl);
    if (data.mainImageUrl) {
      formData.append("mainImageUrl", data.mainImageUrl);
    }

    console.log("generateFormData - Checking secondaryImageUrls:", data.secondaryImageUrls);
    data.secondaryImageUrls.forEach((url, index) => {
      formData.append(`secondaryImageUrls[${index}]`, url);
    });

    console.log("generateFormData - Checking descriptionImageUrls:", data.descriptionImageUrls);
    data.descriptionImageUrls.forEach((url, index) => {
      formData.append(`descriptionImageUrls[${index}]`, url);
    });

    // Variants
    data.variants.forEach((variant, index) => {
      console.log(`generateFormData - Variant[${index}]:`, variant);

      formData.append(`variants[${index}].color`, variant.color || "");
      if (variant.imageUrl) {
        formData.append(`variants[${index}].imageUrl`, variant.imageUrl);
      }

      if (Array.isArray(variant.sizes)) {
        variant.sizes.forEach((size, sizeIndex) => {
          console.log(`generateFormData - Variant[${index}].size[${sizeIndex}]:`, size);
          if (size.sizeName && size.stock !== undefined) {
            formData.append(`variants[${index}].sizes[${sizeIndex}].sizeName`, size.sizeName);
            formData.append(
              `variants[${index}].sizes[${sizeIndex}].stock`, size.stock.toString()
            );
            formData.append(
              `variants[${index}].sizes[${sizeIndex}].price`, size.price.toString()
            );
            if (size.priceAfterDiscount !== undefined) {
              formData.append(
                `variants[${index}].sizes[${sizeIndex}].priceAfterDiscount`, size.priceAfterDiscount.toString()
              );
            }
          }
        });
      }
    });

    return formData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit - Starting product creation');
    toast.info("Creating product, please wait...");

    const formData = generateFormData();
    console.log('handleSubmit - Form data generated', formData);

    // Log all entries in FormData
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await createNewProduct(formData);
      console.log('handleSubmit - Product created successfully');
      toast.success("Product created successfully!");
      resetForm();
    } catch (error) {
      console.error("handleSubmit - Error creating product", error);
      toast.error("Error creating product, please try again.");
    }
  };

  const resetForm = () => {
    console.log('resetForm - Resetting form data');
    setData({
      id: 0,
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      productCode: "",
      featured: false,
      sale: false,
      active: true,
      salePercentage: 0,
      categoryId: 0,
      mainImageUrl: "", // Sửa thành string | File
      secondaryImageUrls: [],
      descriptionImageUrls: [],
      variants: [],
      createdAt: new Date(), // Sửa thành kiểu Date
      updatedAt: new Date(), // Sửa thành kiểu Date
    });
    setVariants([{ id: 0, sizes: [], color: "", imageUrl: null }]); // Sửa thành null để phù hợp với kiểu dữ liệu
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 mt-8">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-semibold text-xl">Create New Product</h1>
        <Button className="bg-blue-500 font-semibold text-white" type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Create"}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 flex flex-col gap-6 h-full">
          <Images
            data={{
              mainImageUrl: data.mainImageUrl,
              secondaryImageUrls: data.secondaryImageUrls,
            }}
            setMainImageUrl={(file) => handleData("mainImageUrl", file)}
            setSecondaryImageUrls={(files) =>
              handleData("secondaryImageUrls", files)
            }
            handleData={handleData}
          />
          <BasicDetails
            data={data}
            handleData={handleData}
            handleCategoryChange={handleCategoryChange}
          />
          <Description data={data} handleData={handleData} />
        </div>
      </div>
      <VariantsTable
        variants={variants}
        handleVariantChange={handleVariantChange}
        addVariant={addVariant}
        removeVariant={removeVariant}
        categorySizes={categorySizes}
      />
      <ToastContainer />
    </form>
  );
}
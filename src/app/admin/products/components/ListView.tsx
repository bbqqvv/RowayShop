"use client";

import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

// Define the product type
interface Product {
  id: string;
  title: string;
  featureImageURL: string;
  price: number;
  salePrice: number;
  stock: number;
  orders: number | null;
  isFeatured: boolean;
}

export default function ListView() {
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [products, setProducts] = useState<Product[]>([]); // Local state for products
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sample product data for demo purposes
  const sampleProducts: Product[] = [
    {
      id: "1",
      title: "Product 1",
      featureImageURL: "https://via.placeholder.com/150",
      price: 100,
      salePrice: 80,
      stock: 10,
      orders: 5,
      isFeatured: true,
    },
    {
      id: "2",
      title: "Product 2",
      featureImageURL: "https://via.placeholder.com/150",
      price: 200,
      salePrice: 150,
      stock: 20,
      orders: 15,
      isFeatured: false,
    },
    // Add more products here as needed
  ];

  // Loading simulation (You can remove this if not needed)
  const loadProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(sampleProducts);
      setIsLoading(false);
    }, 1000);
  };

  const handleNextPage = () => {
    // Logic for paginating
    setPageLimit((prev) => prev + 10); // Increase items per page (for demo purposes)
  };

  const handlePrePage = () => {
    if (pageLimit > 10) {
      setPageLimit((prev) => prev - 10); // Decrease items per page (for demo purposes)
    }
  };

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl w-full overflow-x-auto">
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2">Image</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Title
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Price
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Stock
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Orders
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Status
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => (
            <Row index={index + 1} item={item} key={item?.id} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between text-sm py-3">
        <Button
          isDisabled={isLoading || pageLimit <= 10}
          onClick={handlePrePage}
          size="sm"
          variant="bordered"
        >
          Previous
        </Button>
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(Number(e.target.value))}
          className="px-5 rounded-xl"
        >
          <option value={3}>3 Items</option>
          <option value={5}>5 Items</option>
          <option value={10}>10 Items</option>
          <option value={20}>20 Items</option>
          <option value={100}>100 Items</option>
        </select>
        <Button
          isDisabled={isLoading || products?.length === 0}
          onClick={handleNextPage}
          size="sm"
          variant="bordered"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

interface RowProps {
  item: Product;
  index: number;
}

function Row({ item, index }: RowProps) {
  const handleUpdate = () => {
    // Navigate to the update page (for example)
    console.log(`Update product with id: ${item.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Perform delete logic here (for example, remove from state)
      console.log(`Deleted product with id: ${item.id}`);
    }
  };

  return (
    <tr>
      <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
        {index}
      </td>
      <td className="border-y bg-white px-3 py-2 text-center">
        <div className="flex justify-center">
          <img
            className="h-10 w-10 object-cover"
            src={item?.featureImageURL}
            alt={item?.title}
          />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">{item?.title}</td>
      <td className="border-y bg-white px-3 py-2">
        {item?.salePrice < item?.price && (
          <span className="text-xs text-gray-500 line-through">
            ₹ {item?.price}
          </span>
        )}
        ₹ {item?.salePrice}
      </td>
      <td className="border-y bg-white px-3 py-2">{item?.stock}</td>
      <td className="border-y bg-white px-3 py-2">{item?.orders ?? 0}</td>
      <td className="border-y bg-white px-3 py-2">
        <div className="flex">
          {item?.stock - (item?.orders ?? 0) > 0 ? (
            <div className="px-2 py-1 text-xs text-green-500 bg-green-100 font-bold rounded-md">
              Available
            </div>
          ) : (
            <div className="px-2 py-1 text-xs text-red-500 bg-red-100 rounded-md">
              Out Of Stock
            </div>
          )}
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
        <div className="flex gap-2 items-center">
          <Button onClick={handleUpdate} isIconOnly size="sm">
            <Edit2 size={13} />
          </Button>
          <Button onClick={handleDelete} isIconOnly size="sm" color="danger">
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}

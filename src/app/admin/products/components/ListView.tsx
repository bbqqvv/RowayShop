"use client";
import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import Row from "./Row";
import { useProducts } from "@/hooks/products/useProducts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListView() {
  const {
    products,
    loading,
    error,
    page,
    pageSize,
    setPage,
    setPageSize,
    fetchProducts,
    deleteExistingProduct
  } = useProducts(1, 10); // Bắt đầu từ page 1, pageSize 10

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrePage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await deleteExistingProduct(id);
        toast.success("Product deleted successfully!");
      } catch (error) {
        toast.error("Error deleting product!");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl w-full overflow-x-auto">
      <table className="border-separate border-spacing-y-3 w-full">
        <thead>
          <tr>
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">SN</th>
            <th className="font-semibold border-y bg-white px-3 py-2">Image</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Name</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Price</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Stock</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Orders</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Status</th>
            <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <Row key={item.id} index={index} item={item} onUpdate={() => { }} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between text-sm py-3">
        <Button isDisabled={loading || page === 1} onClick={handlePrePage} size="sm" variant="bordered">
          Previous
        </Button>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="px-5 rounded-xl">
          <option value={3}>3 Items</option>
          <option value={5}>5 Items</option>
          <option value={10}>10 Items</option>
          <option value={20}>20 Items</option>
          <option value={100}>100 Items</option>
        </select>
        <Button isDisabled={loading || products.length === 0} onClick={handleNextPage} size="sm" variant="bordered">
          Next
        </Button>
      </div>
    </div>
  );
}

"use client";
import { Button, CircularProgress, Pagination, Select, SelectItem } from "@nextui-org/react";
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
    totalPages,
    setPage,
    setPageSize,
    fetchProducts,
    deleteExistingProduct
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page, pageSize]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await deleteExistingProduct(id);
        toast.success("Product deleted successfully!");
        // Refresh data or adjust pagination
        if (products.length === 1 && page > 1) {
          setPage(page - 1);
        } else {
          fetchProducts();
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error deleting product!");
      }
    }
  };
  const handleUpdate = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await deleteExistingProduct(id);
        toast.success("Product deleted successfully!");
        // Refresh data or adjust pagination
        if (products.length === 1 && page > 1) {
          setPage(page - 1);
        } else {
          fetchProducts();
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error deleting product!");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <CircularProgress aria-label="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Error: {error}</p>
        <Button className="mt-4" onClick={fetchProducts}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name & Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((item, index) => (
                <Row 
                  key={`${item.id}-${index}`}
                  index={(page - 1) * pageSize + index}
                  item={item}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <Select
              size="sm"
              className="w-24"
              selectedKeys={[pageSize.toString()]}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Select rows per page"
            >
              {[3, 5, 10, 20, 100].map(size => (
                <SelectItem key={size} value={size}>
                  {size} Items
                </SelectItem>
              ))}
            </Select>
          </div>
          
          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            size="sm"
            isDisabled={loading}
            showControls
            showShadow
            aria-label="Product pagination"
          />
        </div>
      )}
    </div>
  );
}
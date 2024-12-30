"use client"
import { Button, CircularProgress } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Row from "./Row";
import { useProducts } from "@/hooks/products/useProducts"; // Giả sử bạn đã tạo custom hook này
import { toast } from "react-toastify"; // Thêm react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify

export default function ListView() {
  const [pageLimit, setPageLimit] = useState<number>(10); // Limit of products per page
  const { products, loading, error, fetchProducts, deleteExistingProduct } =
    useProducts();

  useEffect(() => {
    fetchProducts(); 
  }, [fetchProducts, pageLimit]);

  const handleNextPage = () => {
    // Tăng số lượng sản phẩm mỗi trang
    setPageLimit((prev) => prev + 10);
  };

  const handlePrePage = () => {
    // Giảm số lượng sản phẩm mỗi trang nếu pageLimit > 10
    if (pageLimit > 10) {
      setPageLimit((prev) => prev - 10);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
      try {
        await deleteExistingProduct(id); // Gọi API xóa sản phẩm
        fetchProducts(); // Fetch lại danh sách sản phẩm sau khi xóa
        toast.success("Product deleted successfully!"); // Thông báo thành công
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product!"); // Thông báo thất bại
      }
    }
  };

  // Xử lý khi đang tải hoặc có lỗi
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
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2">Image</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Name
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
          {products.slice(0, pageLimit).map((item, index) => (
            <Row
              key={item.id}
              index={index + 1} // Chỉ mục bắt đầu từ 1
              item={item}
              onUpdate={function (id: number): void {
                throw new Error("Function not implemented.");
              }}
              onDelete={handleDelete} // Truyền hàm handleDelete vào
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between text-sm py-3">
        <Button
          isDisabled={loading || pageLimit <= 10}
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
          isDisabled={loading || products.length === 0}
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

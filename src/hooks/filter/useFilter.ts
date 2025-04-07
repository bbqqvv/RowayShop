import { useState, useEffect } from 'react';
import { filterProducts, getFilterOptions } from '@/services/filterService';
import { ApiResponse, PaginatedResponse } from 'types/api-response.type';
import { ProductResponse } from 'types/product/product-response.types';
import { FilterOptions } from 'types/type';

// Hook lấy danh sách sản phẩm theo filter
export const useFilterProducts = (filters: Record<string, string>, page = 0, pageSize = 9) => {
  const [products, setProducts] = useState<ApiResponse<PaginatedResponse<ProductResponse>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchFilteredProducts = async () => {
      if (filters && Object.keys(filters).length > 0) {
        setLoading(true);
        setError(null);
        try {
          const data = await filterProducts(filters, page, pageSize);
          if (isMounted) setProducts(data);
        } catch (err: any) {
          if (isMounted) setError(err?.message || 'Lỗi không xác định');
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    };

    fetchFilteredProducts();
    return () => {
      isMounted = false;
    };
  }, [filters, page, pageSize]);  // Tại đây sẽ chỉ gọi lại API khi filters thay đổi

  return { products, loading, error };
};
// Hook lấy danh sách tùy chọn lọc
export const useFilterOptions = () => {
  const [options, setOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchFilterOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getFilterOptions();
        if (isMounted) setOptions(data);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Không thể tải tùy chọn lọc');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFilterOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  return { options, loading, error };
};

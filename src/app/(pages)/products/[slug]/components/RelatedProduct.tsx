import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const RelatedProduct: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const recommendedProducts = [
    {
      id: 1,
      name: 'Áo Thun Oversize',
      price: 190000,
      discount: 150000,
      colors: ['#FF0000', '#0000FF', '#000000'],
      tags: ['Thời trang', 'Mới', 'Hot'],
      image: '/images/clothing.png',
    },
    {
      id: 2,
      name: 'Áo Hoodie Nam',
      price: 420000,
      discount: 350000,
      colors: ['#808080', '#000000', '#000080'],
      tags: ['Thu Đông', 'Best Seller'],
      image: '/images/clothing.png',
    },
    {
      id: 3,
      name: 'Áo Khoác Bomber',
      price: 550000,
      discount: 480000,
      colors: ['#008000', '#FFD700', '#000000'],
      tags: ['Unisex', 'Giảm giá'],
      image: '/images/clothing.png',
    },
    {
      id: 4,
      name: 'Áo Len Nam',
      price: 320000,
      discount: 290000,
      colors: ['#A52A2A', '#808000', '#000000'],
      tags: ['Thu Đông', 'Mới'],
      image: '/images/clothing.png',
    },
  ];

  return (
    <>
      <h2 className="text-2xl sm:text-3xl text-center font-bold mb-6">
        Có thể bạn cũng thích
      </h2>
      <div className="bg-gray-50 w-full m:p-6 p-6">
        {recommendedProducts.length > 0 && (
          <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  max-w-screen-xl  justify-center items-center mx-auto">
              {recommendedProducts.map((product) => {
                const [selectedColor, setSelectedColor] = useState(product.colors[0]);
                return (
                  <div key={product.id} className="bg-white p-4 rounded-lg shadow-md relative">
                    {/* Badge giảm giá */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                        20% giảm
                      </span>
                    </div>

                    {/* Nút yêu thích */}
                    <div className="absolute top-4 right-4">
                      <button
                        className={`p-2 rounded-full transition-all ${isFavorite ? 'text-red-500' : 'text-gray-400'
                          }`}
                        onClick={() => setIsFavorite(!isFavorite)}
                        aria-label="Thêm vào danh sách yêu thích"
                      >
                        <Heart fill={isFavorite ? 'red' : 'none'} stroke={isFavorite ? 'red' : 'gray'} />
                      </button>
                    </div>

                    {/* Hình ảnh sản phẩm */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-md mb-4"
                    />

                    <h3 className="font-medium text-lg">{product.name}</h3>

                    {/* Màu sắc sản phẩm */}
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex gap-2 flex-wrap mt-1">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                              }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          ></button>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 font-semibold text-blue-600 px-2 py-1 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Giá & Nút mua */}
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="text-red-500 font-semibold text-xl sm:text-2xl">
                          {product.discount.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="line-through text-gray-400 text-sm ml-2">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <button className="bg-gray-200 text-black p-2 rounded-full hover:bg-white flex items-center justify-center">
                        <ShoppingCart className="text-black" size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>

  );
};

export default RelatedProduct;

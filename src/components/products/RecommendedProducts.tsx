import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const RecommendedProducts = () => {
    const [isFavorite, setIsFavorite] = useState({});

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
    ];

    return (
        <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">Có thể bạn cũng thích</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => {
                    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
                    return (
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md relative">
                            <div className="absolute top-2 left-2">
                                <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {Math.round(((product.price - product.discount) / product.price) * 100)}% giảm
                                </span>
                            </div>
                            <div className="absolute top-2 right-2">
                                <button
                                    aria-label="Thêm vào danh sách yêu thích"
                                >
                                    <Heart />
                                </button>
                            </div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full aspect-square object-cover rounded-md mb-4"
                            />
                            <h3 className="font-medium text-lg">{product.name}</h3>
                            <div className="mt-2 text-sm text-gray-600 flex gap-2 mt-1">
                                {product.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === color ? 'border-black scale-110' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    ></button>
                                ))}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className='flex items-center justify-between mt-2'>
                                <div>
                                    <span className="text-red-500 font-semibold text-2xl">
                                        {product.discount.toLocaleString('vi-VN')}đ
                                    </span>
                                    <span className="line-through text-gray-400 text-sm ml-2">
                                        {product.price.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                                <button className="bg-gray-200 text-black p-2 rounded-full hover:bg-white flex items-center justify-center">
                                    <ShoppingCart className='text-black' size={20} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecommendedProducts;
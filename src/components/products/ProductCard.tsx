"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ProductResponse } from "types/product/product-response.types";
import { Badge } from "@nextui-org/react";
import FavouriteButton from "../shared/FavouriteButton";

const DEFAULT_IMAGE_URL = "/images/default-image.png";

type ProductCardProps = {
    product: ProductResponse;
    markAsViewed: (id: number) => void;
};

const ProductCard = ({ product, markAsViewed }: ProductCardProps) => {
    const {
        id,
        name,
        salePercentage = 0,
        mainImageUrl = "",
        slug = "",
        tags = [],
        variants = [],
    } = product;

    const getImageUrl = (url: string) => {
        if (!url) return DEFAULT_IMAGE_URL;
        if (url.startsWith("http")) return url;
        return url.startsWith("/") ? url : `/${url}`;
    };

    const [selectedImage, setSelectedImage] = useState<string>(
        getImageUrl(mainImageUrl)
    );
    const hoverImage = variants.find(v => v.imageUrl)?.imageUrl || "";

    const price = variants[0]?.sizes[0]?.price ?? 0;
    const salePrice =
        salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;

    const handleClick = () => markAsViewed(id);

    const handleImageChange = useCallback(
        (imageUrl: string) => setSelectedImage(getImageUrl(imageUrl)),
        []
    );

    return (
        <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            {/* Sale badge */}
            {salePercentage > 0 && (
                <div className="absolute top-3 left-3 z-20">
                    <span className="inline-block rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 text-xs font-bold text-white">
                        -{salePercentage}%
                    </span>
                </div>
            )}

            {/* Favourite button */}
            <div className="absolute top-3 right-3 z-20">
                <FavouriteButton product={product} />
            </div>

            {/* Product image */}
            <Link href={`/products/${slug}`} onClick={handleClick} className="relative block">
                <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                        src={selectedImage}
                        alt={name || "Product image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={id <= 8}
                    />
                    {hoverImage && (
                        <Image
                            src={getImageUrl(hoverImage)}
                            alt={name || "Product image hover"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            priority={false}
                        />
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                <Link href={`/products/${slug}`} onClick={handleClick}>
                    <h3 className="line-clamp-2 text-base sm:text-lg font-semibold text-gray-900 hover:text-primary">
                        {name}
                    </h3>
                </Link>

                {/* Color variants */}
                {variants.map(({ color = "#ccc", imageUrl = "" }, index) => (
                    <button
                        key={index}
                        className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110 ${selectedImage === getImageUrl(imageUrl)
                            ? "border-black scale-110"
                            : "border-gray-300"
                            }`}
                        style={{ backgroundColor: color?.toLowerCase?.() ?? "#ccc" }}
                        onClick={() => handleImageChange(imageUrl)}
                        title={color}
                        aria-label={`Select ${color} color`}
                    />
                ))}

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <Badge
                                key={index}
                                color="secondary"
                                variant="flat"
                                className="text-xs font-medium"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 pt-0">
                <div className="flex w-full items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-red-500">
                            {salePrice.toLocaleString("vi-VN")}₫
                        </span>
                        {salePercentage > 0 && (
                            <span className="text-xs text-gray-400 line-through">
                                {price.toLocaleString("vi-VN")}₫
                            </span>
                        )}
                    </div>
                    <Link
                        href={`/products/${slug}`}
                        onClick={handleClick}
                        className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
                        aria-label="Xem chi tiết sản phẩm"
                    >
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

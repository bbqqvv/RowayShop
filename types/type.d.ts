declare interface User {
    id?: number; 
    username: string;
    email: string;
    password?: string;  // Mật khẩu chỉ cần khi tạo mới
    createdAt?: string;
    updatedAt?: string;
}

declare interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}


// Kiểu dữ liệu cho phản hồi API có phân trang
declare interface PaginatedResponse<T> {
    code: number;
    message: string;
    data: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalElements: number;
        items: T[];
    };
}
declare interface Product {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    productCode: string;
    featured: boolean;
    sale: boolean;
    active: boolean;
    salePercentage: number;
    categoryId: number;
    mainImageUrl: string | File;
    secondaryImageUrls: (string | File)[];
    descriptionImageUrls: (string | File)[];
    variants: Variant[];
    createdAt: Date;
    updatedAt: Date;
}

declare interface Variant {
    id: number;
    color: string;
    imageUrl: string | File | null;
    sizes: SizeProduct[];
}

declare interface SizeProduct {
    sizeName: string;
    stock: number;
    price: number;
    priceAfterDiscount?: number;
}

declare interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
    sizes: { id: number; name: string }[];

}
declare interface Cart {
    id: number;
    userId: number;
    cartItems: CartItem[];
    totalPrice: number;
}

declare interface CartItem {
    id: number;
    productId: number;
    productName: string;
    mainImageUrl: string;
    quantity: number;
    color: string;
    sizeName: string;
    price: number;
    subtotal: number;
    inStock: boolean;
}



declare interface VariantsTableProps {
    variants: Variant[];
    handleVariantChange: (index: number, key: keyof Variant, value: string | File | SizeProduct[]) => void;
    addVariant: () => void;
    removeVariant: (index: number) => void;
    categorySizes: { id: number; name: string }[];
}

declare interface BasicDetailsProps {
    data: ProductItem;
    handleData: (key: keyof ProductItem, value: any) => void;
    handleCategoryChange: (categoryId: string, sizes: { id: number; name: string }[]) => void;
}

declare interface ImagesProps {
    data: {
        mainImageUrl: string | File | null;
        secondaryImageUrls: (string | File)[];
    };
    setMainImageUrl: (value: string | File | null) => void;
    setSecondaryImageUrls: (value: (string | File)[]) => void;
    handleData: (key: keyof ProductItem, value: any) => void; // Standardized
}
declare interface DescriptionProps {
    data: {
        description?: string;
    } | null;
    handleData: (key: keyof ProductItem, value: any) => void;
}
declare interface RowProps {
    item: {
        id: number;
        mainImageUrl: string | File;
        name: string;
        variants?: Variant[];
    };
    index: number;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
}

declare interface PageProps {
    params: { slug: string };
}


declare interface ProductCardProps {
    product: {
        id: string | number;
        name: string;
        price: number;
        salePercentage?: number;
        mainImageUrl: string;
        slug: string;
        mainImageUrl: string | File;
        secondaryImageUrls: (string | File)[];
        descriptionImageUrls: (string | File)[];
        variants: Variant[];
    };
    onAddToCart: (productId: string) => void;
}
interface FavouriteButtonProps {
    productId: number;
    token: string | null;
}

declare interface FavouriteContextProps {
    favourites: FavouriteItem[];
    toggleFavourite: (productId: number) => void;
}
const FavouriteContext = createContext<FavouriteContextProps>({
    favourites: [], // ✅ Luôn khởi tạo mảng rỗng để tránh lỗi
    toggleFavourite: () => { },
});
declare interface FavouriteItem {
    productId: number;
    id: number;
    imageUrl: string;
    nameProduct: string;
    price: number | null;
    userId: number;
    productUrl?: string; // Thêm nếu có URL chi tiết sản phẩm
}
declare interface Address {
    id: number;
    recipientName: string;
    country: string;
    province: string;
    district: string;
    commune: string;
    addressLine: string;
    note?: string; // Có thể không bắt buộc
    phoneNumber: string;
    email: string;
    defaultAddress: boolean;
}

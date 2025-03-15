// --- User-related Interfaces ---
declare interface User {
    id?: number;
    username: string;
    email: string;
    password?: string; // Chỉ cần khi tạo mới
    createdAt?: string;
    updatedAt?: string;
}

declare interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// --- Pagination ---
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

// --- Product-related Interfaces ---
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

// --- Category ---
declare interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
    sizes: { id: number; name: string }[];
}

// --- Cart-related Interfaces ---
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

// --- Component Props ---
declare interface VariantsTableProps {
    variants: Variant[];
    handleVariantChange: (index: number, key: keyof Variant, value: string | File | SizeProduct[]) => void;
    addVariant: () => void;
    removeVariant: (index: number) => void;
    categorySizes: { id: number; name: string }[];
}

declare interface BasicDetailsProps {
    data: Product;
    handleData: <K extends keyof Product>(key: K, value: Product[K]) => void;
    handleCategoryChange: (categoryId: number, sizes: { id: number; name: string }[]) => void;
}

// Sửa `ImagesProps` để tránh trùng lặp
declare interface ImagesProps {
    data: {
        mainImageUrl: string | File | null;
        secondaryImageUrls: (string | File)[];
    } | null;
    setMainImageUrl: (value: string | File | null) => void;
    setSecondaryImageUrls: (value: (string | File)[]) => void;
    handleData: <K extends keyof Product>(key: K, value: Product[K]) => void;
}

declare interface DescriptionProps {
    data: {
        description?: string;
    } | null;
    handleData: <K extends keyof Product>(key: K, value: Product[K]) => void;
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
    product: Product;
    onAddToCart: (productId: number) => void;
}

// --- Favourite-related Interfaces ---
declare interface FavouriteButtonProps {
    productId: number;
    token: string | null;
}

declare interface FavouriteContextProps {
    favourites: FavouriteItem[];
    toggleFavourite: (productId: number) => void;
}

declare const FavouriteContext: React.Context<FavouriteContextProps>;

declare interface FavouriteItem {
    productId: number;
    id: number;
    imageUrl: string;
    nameProduct: string;
    price: number | null;
    userId: number;
    productUrl?: string;
}

// --- Address ---
declare interface Address {
    id: number;
    recipientName: string;
    country: string;
    province: string;
    district: string;
    commune: string;
    addressLine: string;
    note?: string;
    phoneNumber: string;
    email: string;
    defaultAddress: boolean;
}

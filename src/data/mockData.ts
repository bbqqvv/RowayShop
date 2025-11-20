import { ProductResponse } from "types/product/product-response.types";
import { CategoryResponse } from "types/category/category-response.type";
import { ProductReviewResponse } from "types/product/product-review-response.type";

export const mockCategories: CategoryResponse[] = [
    {
        id: 1,
        name: "Áo Nam",
        slug: "ao-nam",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=300&auto=format&fit=crop",
        sizes: [{ id: 1, name: "S", categoryId: 1 }, { id: 2, name: "M", categoryId: 1 }, { id: 3, name: "L", categoryId: 1 }, { id: 4, name: "XL", categoryId: 1 }]
    },
    {
        id: 2,
        name: "Quần Nam",
        slug: "quan-nam",
        image: "https://images.unsplash.com/photo-1542272617-08f086302542?q=80&w=300&auto=format&fit=crop",
        sizes: [{ id: 5, name: "29", categoryId: 2 }, { id: 6, name: "30", categoryId: 2 }, { id: 7, name: "31", categoryId: 2 }, { id: 8, name: "32", categoryId: 2 }]
    },
    {
        id: 3,
        name: "Áo Khoác",
        slug: "ao-khoac",
        image: "https://images.unsplash.com/photo-1551028919-38010076d210?q=80&w=300&auto=format&fit=crop",
        sizes: [{ id: 9, name: "M", categoryId: 3 }, { id: 10, name: "L", categoryId: 3 }, { id: 11, name: "XL", categoryId: 3 }]
    },
    {
        id: 4,
        name: "Giày Dép",
        slug: "giay-dep",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300&auto=format&fit=crop",
        sizes: [{ id: 12, name: "39", categoryId: 4 }, { id: 13, name: "40", categoryId: 4 }, { id: 14, name: "41", categoryId: 4 }, { id: 15, name: "42", categoryId: 4 }]
    },
    {
        id: 5,
        name: "Phụ Kiện",
        slug: "phu-kien",
        image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?q=80&w=300&auto=format&fit=crop",
        sizes: []
    },
    {
        id: 6,
        name: "Vest & Blazer",
        slug: "vest-blazer",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4729d7?q=80&w=300&auto=format&fit=crop",
        sizes: [{ id: 16, name: "48", categoryId: 6 }, { id: 17, name: "50", categoryId: 6 }, { id: 18, name: "52", categoryId: 6 }]
    },
    {
        id: 7,
        name: "Đồ Thể Thao",
        slug: "do-the-thao",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=300&auto=format&fit=crop",
        sizes: [{ id: 19, name: "S", categoryId: 7 }, { id: 20, name: "M", categoryId: 7 }, { id: 21, name: "L", categoryId: 7 }]
    }
];

export const mockProducts: ProductResponse[] = [
    // --- ÁO NAM ---
    {
        id: 1,
        name: "Áo Thun Basic Premium Cotton",
        slug: "ao-thun-basic-premium",
        shortDescription: "Áo thun trơn cao cấp, form regular fit.",
        description: "Chất liệu 100% Cotton 2 chiều, định lượng 250gsm dày dặn nhưng thoáng mát. Công nghệ xử lý vải chống co rút, bền màu sau nhiều lần giặt. Thiết kế tối giản phù hợp mọi hoàn cảnh.",
        productCode: "AT001",
        featured: true,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Áo Nam",
        mainImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"
        ],
        descriptionImageUrls: [],
        tags: ["basic", "cotton", "summer", "casual"],
        variants: [
            {
                id: 101,
                color: "Trắng",
                imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "S", stock: 50, price: 250000, priceAfterDiscount: 250000 },
                    { sizeName: "M", stock: 45, price: 250000, priceAfterDiscount: 250000 },
                    { sizeName: "L", stock: 30, price: 250000, priceAfterDiscount: 250000 },
                    { sizeName: "XL", stock: 15, price: 250000, priceAfterDiscount: 250000 }
                ]
            },
            {
                id: 102,
                color: "Đen",
                imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "S", stock: 40, price: 250000, priceAfterDiscount: 250000 },
                    { sizeName: "M", stock: 50, price: 250000, priceAfterDiscount: 250000 },
                    { sizeName: "L", stock: 35, price: 250000, priceAfterDiscount: 250000 }
                ]
            }
        ],
        reviewCount: 128,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-02-20")
    },
    {
        id: 2,
        name: "Áo Polo Pique Signature",
        slug: "ao-polo-pique-signature",
        shortDescription: "Áo Polo vải cá sấu mắt chim, bo cổ dệt cao cấp.",
        description: "Vải CVC Pique (60% Cotton, 40% Polyester) giúp áo đứng form, hạn chế nhăn nhàu và bền màu. Bo cổ và tay dệt Jacquard tinh tế. Logo thêu nổi sang trọng.",
        productCode: "AP002",
        featured: true,
        sale: true,
        active: true,
        salePercentage: 15,
        categoryName: "Áo Nam",
        mainImageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [
            "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=800&auto=format&fit=crop"
        ],
        descriptionImageUrls: [],
        tags: ["polo", "smart-casual", "office"],
        variants: [
            {
                id: 201,
                color: "Xanh Navy",
                imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "M", stock: 20, price: 450000, priceAfterDiscount: 382500 },
                    { sizeName: "L", stock: 25, price: 450000, priceAfterDiscount: 382500 },
                    { sizeName: "XL", stock: 10, price: 450000, priceAfterDiscount: 382500 }
                ]
            }
        ],
        reviewCount: 45,
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-03-10")
    },
    {
        id: 3,
        name: "Áo Sơ Mi Oxford Button-Down",
        slug: "ao-so-mi-oxford",
        shortDescription: "Sơ mi vải Oxford dệt nổi, form Regular.",
        description: "Chất liệu Oxford cổ điển, dày dặn và đứng dáng. Thiết kế cổ Button-down lịch sự, phù hợp đi làm hoặc đi tiệc nhẹ. Dễ dàng phối với quần âu hoặc Chinos.",
        productCode: "ASM003",
        featured: false,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Áo Nam",
        mainImageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["shirt", "office", "formal"],
        variants: [
            {
                id: 301,
                color: "Xanh Nhạt",
                imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "39", stock: 15, price: 550000, priceAfterDiscount: 550000 },
                    { sizeName: "40", stock: 20, price: 550000, priceAfterDiscount: 550000 },
                    { sizeName: "41", stock: 12, price: 550000, priceAfterDiscount: 550000 }
                ]
            }
        ],
        reviewCount: 32,
        createdAt: new Date("2024-02-15"),
        updatedAt: new Date("2024-02-15")
    },
    {
        id: 4,
        name: "Áo Flannel Caro Vintage",
        slug: "ao-flannel-caro",
        shortDescription: "Sơ mi dạ Flannel kẻ caro phong cách Grunge.",
        description: "Vải dạ mềm mại, giữ ấm tốt. Họa tiết caro phối màu retro. Có thể mặc khoác ngoài áo thun hoặc mặc đơn.",
        productCode: "ASM004",
        featured: true,
        sale: true,
        active: true,
        salePercentage: 25,
        categoryName: "Áo Nam",
        mainImageUrl: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["flannel", "streetwear", "layering"],
        variants: [
            {
                id: 401,
                color: "Đỏ Đen",
                imageUrl: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "M", stock: 10, price: 420000, priceAfterDiscount: 315000 },
                    { sizeName: "L", stock: 8, price: 420000, priceAfterDiscount: 315000 }
                ]
            }
        ],
        reviewCount: 56,
        createdAt: new Date("2023-11-20"),
        updatedAt: new Date("2024-01-05")
    },

    // --- QUẦN NAM ---
    {
        id: 5,
        name: "Quần Jean Slim Fit Ripped",
        slug: "quan-jean-slim-fit-ripped",
        shortDescription: "Quần Jean rách gối cá tính, co giãn nhẹ.",
        description: "Chất liệu Denim 12oz pha Spandex co giãn thoải mái. Wash màu thủ công tạo hiệu ứng bụi bặm. Chi tiết rách gối được xử lý kỹ lưỡng.",
        productCode: "QJ005",
        featured: true,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Quần Nam",
        mainImageUrl: "https://images.unsplash.com/photo-1542272617-08f086302542?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
        ],
        descriptionImageUrls: [],
        tags: ["jeans", "streetwear", "denim"],
        variants: [
            {
                id: 501,
                color: "Xanh Wash",
                imageUrl: "https://images.unsplash.com/photo-1542272617-08f086302542?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "29", stock: 15, price: 650000, priceAfterDiscount: 650000 },
                    { sizeName: "30", stock: 20, price: 650000, priceAfterDiscount: 650000 },
                    { sizeName: "31", stock: 18, price: 650000, priceAfterDiscount: 650000 },
                    { sizeName: "32", stock: 10, price: 650000, priceAfterDiscount: 650000 }
                ]
            }
        ],
        reviewCount: 89,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-02-28")
    },
    {
        id: 6,
        name: "Quần Tây Âu Slim Crop",
        slug: "quan-tay-au-slim-crop",
        shortDescription: "Quần âu dáng lửng trên mắt cá, phong cách Hàn Quốc.",
        description: "Vải tuyết mưa cao cấp, không nhăn, giữ ly tốt. Thiết kế cạp cao, ống đứng hơi ôm, độ dài crop trẻ trung. Phù hợp phối với Sneaker hoặc Loafer.",
        productCode: "QA006",
        featured: false,
        sale: true,
        active: true,
        salePercentage: 10,
        categoryName: "Quần Nam",
        mainImageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["trousers", "office", "korean-style"],
        variants: [
            {
                id: 601,
                color: "Xám Ghi",
                imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "29", stock: 25, price: 500000, priceAfterDiscount: 450000 },
                    { sizeName: "30", stock: 30, price: 500000, priceAfterDiscount: 450000 },
                    { sizeName: "31", stock: 20, price: 500000, priceAfterDiscount: 450000 }
                ]
            }
        ],
        reviewCount: 42,
        createdAt: new Date("2024-02-05"),
        updatedAt: new Date("2024-02-15")
    },
    {
        id: 7,
        name: "Quần Short Kaki Basic",
        slug: "quan-short-kaki",
        shortDescription: "Quần short kaki ngang gối, năng động.",
        description: "Chất liệu Kaki 100% Cotton dày dặn. Form Regular thoải mái vận động. Màu sắc trung tính dễ phối đồ.",
        productCode: "QS007",
        featured: false,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Quần Nam",
        mainImageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["shorts", "summer", "casual"],
        variants: [
            {
                id: 701,
                color: "Be",
                imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "29", stock: 30, price: 350000, priceAfterDiscount: 350000 },
                    { sizeName: "30", stock: 35, price: 350000, priceAfterDiscount: 350000 },
                    { sizeName: "31", stock: 25, price: 350000, priceAfterDiscount: 350000 }
                ]
            }
        ],
        reviewCount: 67,
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-03-20")
    },

    // --- ÁO KHOÁC ---
    {
        id: 8,
        name: "Áo Khoác Bomber Ma-1",
        slug: "ao-khoac-bomber-ma1",
        shortDescription: "Bomber Jacket phong cách quân đội.",
        description: "Lớp ngoài vải dù gió chống thấm nước nhẹ. Lớp lót trần bông giữ ấm. Túi tay áo đặc trưng. Bo tay và gấu áo dệt kim chắc chắn.",
        productCode: "AK008",
        featured: true,
        sale: true,
        active: true,
        salePercentage: 20,
        categoryName: "Áo Khoác",
        mainImageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["jacket", "bomber", "winter"],
        variants: [
            {
                id: 801,
                color: "Xanh Rêu",
                imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "M", stock: 10, price: 850000, priceAfterDiscount: 680000 },
                    { sizeName: "L", stock: 15, price: 850000, priceAfterDiscount: 680000 },
                    { sizeName: "XL", stock: 5, price: 850000, priceAfterDiscount: 680000 }
                ]
            }
        ],
        reviewCount: 95,
        createdAt: new Date("2023-12-01"),
        updatedAt: new Date("2024-01-15")
    },
    {
        id: 9,
        name: "Áo Khoác Denim Classic",
        slug: "ao-khoac-denim",
        shortDescription: "Áo khoác bò dáng Trucker kinh điển.",
        description: "Denim 14oz dày dặn, bền bỉ. Màu Indigo cổ điển. Khuy đồng chống gỉ. Item không thể thiếu cho phong cách bụi bặm.",
        productCode: "AK009",
        featured: false,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Áo Khoác",
        mainImageUrl: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["denim", "jacket", "vintage"],
        variants: [
            {
                id: 901,
                color: "Xanh Indigo",
                imageUrl: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "M", stock: 20, price: 750000, priceAfterDiscount: 750000 },
                    { sizeName: "L", stock: 18, price: 750000, priceAfterDiscount: 750000 }
                ]
            }
        ],
        reviewCount: 34,
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-02-10")
    },

    // --- GIÀY DÉP ---
    {
        id: 10,
        name: "Sneaker Minimalist White",
        slug: "sneaker-minimalist-white",
        shortDescription: "Giày sneaker trắng da Microfiber cao cấp.",
        description: "Thiết kế tối giản, tinh tế. Da Microfiber chống nhăn, dễ vệ sinh. Đế cao su đúc nguyên khối êm ái, chống trơn trượt.",
        productCode: "GD010",
        featured: true,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Giày Dép",
        mainImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop"
        ],
        descriptionImageUrls: [],
        tags: ["sneaker", "shoes", "white"],
        variants: [
            {
                id: 1001,
                color: "Trắng",
                imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "40", stock: 15, price: 890000, priceAfterDiscount: 890000 },
                    { sizeName: "41", stock: 20, price: 890000, priceAfterDiscount: 890000 },
                    { sizeName: "42", stock: 15, price: 890000, priceAfterDiscount: 890000 }
                ]
            }
        ],
        reviewCount: 112,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-03-05")
    },
    {
        id: 11,
        name: "Chelsea Boot Suede",
        slug: "chelsea-boot-suede",
        shortDescription: "Giày Chelsea Boot da lộn sang trọng.",
        description: "Da lộn (Suede) thật 100%. Đế phíp gỗ sang trọng. Chun co giãn tốt, ôm chân. Phù hợp phong cách lịch lãm hoặc rock chic.",
        productCode: "GD011",
        featured: true,
        sale: true,
        active: true,
        salePercentage: 30,
        categoryName: "Giày Dép",
        mainImageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["boots", "chelsea", "leather"],
        variants: [
            {
                id: 1101,
                color: "Nâu Bò",
                imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "40", stock: 8, price: 1200000, priceAfterDiscount: 840000 },
                    { sizeName: "41", stock: 10, price: 1200000, priceAfterDiscount: 840000 }
                ]
            }
        ],
        reviewCount: 28,
        createdAt: new Date("2023-12-15"),
        updatedAt: new Date("2024-01-20")
    },

    // --- PHỤ KIỆN ---
    {
        id: 12,
        name: "Đồng Hồ Chronograph",
        slug: "dong-ho-chronograph",
        shortDescription: "Đồng hồ nam dây da, mặt kính Sapphire.",
        description: "Máy Quartz Nhật Bản bền bỉ. Mặt kính Sapphire chống trầy xước. Dây da bò thật mềm mại. Chống nước 5ATM.",
        productCode: "PK012",
        featured: true,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Phụ Kiện",
        mainImageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["watch", "accessories", "luxury"],
        variants: [
            {
                id: 1201,
                color: "Nâu/Vàng",
                imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "Freesize", stock: 5, price: 2500000, priceAfterDiscount: 2500000 }
                ]
            }
        ],
        reviewCount: 15,
        createdAt: new Date("2023-11-10"),
        updatedAt: new Date("2023-12-25")
    },
    {
        id: 13,
        name: "Kính Mát Wayfarer",
        slug: "kinh-mat-wayfarer",
        shortDescription: "Kính mát dáng Wayfarer cổ điển.",
        description: "Gọng nhựa Acetate cao cấp. Tròng kính Polarized chống chói, chống tia UV400 bảo vệ mắt tối đa.",
        productCode: "PK013",
        featured: false,
        sale: true,
        active: true,
        salePercentage: 50,
        categoryName: "Phụ Kiện",
        mainImageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["glasses", "summer", "sale"],
        variants: [
            {
                id: 1301,
                color: "Đen",
                imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "Freesize", stock: 50, price: 600000, priceAfterDiscount: 300000 }
                ]
            }
        ],
        reviewCount: 78,
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-03-15")
    },
    {
        id: 14,
        name: "Ví Da Bò Mini",
        slug: "vi-da-bo-mini",
        shortDescription: "Ví da bò sáp nhỏ gọn, handmade.",
        description: "Da bò sáp ngựa điên (Crazy Horse) càng dùng càng bóng đẹp. Thiết kế tối giản 2 ngăn, đựng vừa thẻ và tiền gấp đôi.",
        productCode: "PK014",
        featured: false,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Phụ Kiện",
        mainImageUrl: "https://images.unsplash.com/photo-1627123424574-183ce30259e6?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["wallet", "leather", "handmade"],
        variants: [
            {
                id: 1401,
                color: "Nâu Sáp",
                imageUrl: "https://images.unsplash.com/photo-1627123424574-183ce30259e6?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "Freesize", stock: 30, price: 280000, priceAfterDiscount: 280000 }
                ]
            }
        ],
        reviewCount: 22,
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-20")
    },

    // --- VEST & BLAZER ---
    {
        id: 15,
        name: "Blazer Hàn Quốc",
        slug: "blazer-han-quoc",
        shortDescription: "Áo khoác Blazer form rộng trẻ trung.",
        description: "Phong cách Hàn Quốc hiện đại. Vải tuyết mưa dày dặn, đứng form. Có đệm vai nhẹ. Phù hợp mặc đi làm hoặc đi chơi.",
        productCode: "VB015",
        featured: true,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Vest & Blazer",
        mainImageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["blazer", "korean", "smart-casual"],
        variants: [
            {
                id: 1501,
                color: "Đen",
                imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "M", stock: 10, price: 950000, priceAfterDiscount: 950000 },
                    { sizeName: "L", stock: 12, price: 950000, priceAfterDiscount: 950000 }
                ]
            }
        ],
        reviewCount: 40,
        createdAt: new Date("2023-12-10"),
        updatedAt: new Date("2024-01-05")
    },
    {
        id: 16,
        name: "Bộ Vest Nam Lịch Lãm",
        slug: "bo-vest-nam",
        shortDescription: "Bộ Suit nam 2 mảnh sang trọng.",
        description: "Gồm áo Vest và quần âu. Chất liệu Wool pha cao cấp, thoáng khí, ít nhăn. Form Slim fit tôn dáng. Phù hợp cho các sự kiện quan trọng.",
        productCode: "VB016",
        featured: false,
        sale: false,
        active: true,
        salePercentage: 0,
        categoryName: "Vest & Blazer",
        mainImageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4729d7?q=80&w=800&auto=format&fit=crop",
        secondaryImageUrls: [],
        descriptionImageUrls: [],
        tags: ["suit", "formal", "wedding"],
        variants: [
            {
                id: 1601,
                color: "Xanh Navy",
                imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4729d7?q=80&w=800&auto=format&fit=crop",
                sizes: [
                    { sizeName: "48", stock: 5, price: 2500000, priceAfterDiscount: 2500000 },
                    { sizeName: "50", stock: 5, price: 2500000, priceAfterDiscount: 2500000 }
                ]
            }
        ],
        reviewCount: 10,
        createdAt: new Date("2023-10-20"),
        updatedAt: new Date("2023-11-15")
    }
];

export const mockReviews: ProductReviewResponse[] = [
    {
        id: 1,
        productId: 1,
        orderItemId: 101,
        productName: "Áo Thun Basic Premium Cotton",
        userId: 101,
        userName: "Nguyễn Văn A",
        rating: 5,
        reviewText: "Áo mặc rất mát, vải cotton xịn. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop tiếp.",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop",
        reviewCount: 0,
        createdAt: "2024-03-10T10:00:00Z"
    },
    {
        id: 2,
        productId: 1,
        orderItemId: 102,
        productName: "Áo Thun Basic Premium Cotton",
        userId: 102,
        userName: "Trần Thị B",
        rating: 4,
        reviewText: "Form áo đẹp, nhưng màu trắng hơi mỏng một chút. Tạm ổn trong tầm giá.",
        imageUrl: "",
        reviewCount: 0,
        createdAt: "2024-03-12T14:30:00Z"
    },
    {
        id: 3,
        productId: 1,
        orderItemId: 103,
        productName: "Áo Thun Basic Premium Cotton",
        userId: 103,
        userName: "Lê Văn C",
        rating: 5,
        reviewText: "Tuyệt vời! Mua 3 cái mặc thay đổi. Rất thích chất vải này.",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=200&auto=format&fit=crop",
        reviewCount: 0,
        createdAt: "2024-03-15T09:15:00Z"
    },
    {
        id: 4,
        productId: 5,
        orderItemId: 201,
        productName: "Quần Jean Slim Fit Ripped",
        userId: 104,
        userName: "Phạm Minh D",
        rating: 5,
        reviewText: "Quần đẹp, co giãn tốt. Size chuẩn như bảng size shop đưa.",
        imageUrl: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=200&auto=format&fit=crop",
        reviewCount: 0,
        createdAt: "2024-02-20T11:20:00Z"
    },
    {
        id: 5,
        productId: 5,
        orderItemId: 202,
        productName: "Quần Jean Slim Fit Ripped",
        userId: 105,
        userName: "Hoàng Văn E",
        rating: 3,
        reviewText: "Vải hơi cứng, mặc không thoải mái lắm. Hy vọng giặt xong sẽ mềm hơn.",
        imageUrl: "",
        reviewCount: 0,
        createdAt: "2024-02-25T16:45:00Z"
    },
    {
        id: 6,
        productId: 10,
        orderItemId: 301,
        productName: "Sneaker Minimalist White",
        userId: 106,
        userName: "Đỗ Thị F",
        rating: 5,
        reviewText: "Giày đẹp xuất sắc. Đi êm chân, phối đồ cực dễ. 10 điểm!",
        imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=200&auto=format&fit=crop",
        reviewCount: 0,
        createdAt: "2024-03-05T08:00:00Z"
    },
    {
        id: 7,
        productId: 1,
        orderItemId: 104,
        productName: "Áo Thun Basic Premium Cotton",
        userId: 107,
        userName: "Vũ Văn G",
        rating: 5,
        reviewText: "Hàng chất lượng cao. Shop tư vấn nhiệt tình.",
        imageUrl: "",
        reviewCount: 0,
        createdAt: "2024-03-18T13:10:00Z"
    },
    {
        id: 8,
        productId: 1,
        orderItemId: 105,
        productName: "Áo Thun Basic Premium Cotton",
        userId: 108,
        userName: "Ngô Thị H",
        rating: 4,
        reviewText: "Giao hàng hơi chậm chút nhưng áo đẹp nên bỏ qua.",
        imageUrl: "",
        reviewCount: 0,
        createdAt: "2024-03-19T15:20:00Z"
    }
];

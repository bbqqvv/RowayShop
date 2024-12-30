interface Product {
  data: {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    salePercentage: number;
    mainImageUrl: string;
    secondaryImageUrls: string[];
    variants: {
      size: string;
      color: string;
      price: number;
    }[];
  };
}

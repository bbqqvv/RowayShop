export interface Category {
  sizes: never[];
  id: number;
  name: string;
  slug: string;
  image?: string; // Optional if some categories might not have an image
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string; // Optional if some categories might not have an image
}

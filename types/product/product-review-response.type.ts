export interface ProductReviewResponse {
    id: number
    productId: number
    productName: string
    userId: number
    userName: string
    rating: number
    reviewText: string
    imageUrl: string 
    createdAt: string
  }
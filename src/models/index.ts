export interface ProductItem {
    id: string;
    title: string;
    coverImage?: string;
    price: number;
    score: number;
}

export interface Coupon {
    type: string;
    title: string;
    discountRate: number;
}
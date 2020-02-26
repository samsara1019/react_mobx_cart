export interface ProductItem {
    id: string;
    title: string;
    coverImage?: string;
    price: number;
    score: number;
}

export interface CartProductItem extends ProductItem {
    count: number;
    ischecked: boolean;
}

export interface Coupon {
    type: string;
    title: string;
    discountRate: number;
}
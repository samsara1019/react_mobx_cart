import { ProductItem } from '../models';
import ProductItems from "../data/productItems"

const DEFAULT_GET_COUNT = 5;

let sortedProductItemsByScore: ProductItem[] = []

export const makeSortedProductItemsByScore = () => {
    sortedProductItemsByScore = sortProductItems();
    if (sortedProductItemsByScore.length)
        sortedProductItemsByScore = 빈값대응(sortedProductItemsByScore);
    else
        console.error('no data!')
}

const sortProductItems = () => {
    if (!ProductItems.length) return []
    return ProductItems
        .sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
}

const 빈값대응 = (빈값있을지도: ProductItem[]) => {
    return 빈값있을지도
}

export const getProductItems = (existCount: number = 0) => {
    return sortedProductItemsByScore.slice(existCount, DEFAULT_GET_COUNT)
}

import { ProductItem } from '../models';
import ProductItems from "../data/productItems"

export const DEFAULT_GET_COUNT = 5;

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

export const getProductItems = (existCount: number = 1) => {
    let start = 0;
    let end = 0;

    if (existCount === 1) {
        end = DEFAULT_GET_COUNT
    } else {
        start = (existCount - 1) * DEFAULT_GET_COUNT
        end = start + DEFAULT_GET_COUNT
    }

    return sortedProductItemsByScore.slice(start, end)
}

export const getProductTotalCount = () => {
    return sortedProductItemsByScore.length
}

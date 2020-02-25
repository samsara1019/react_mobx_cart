import { ProductItem } from '../models';
import ProductItems from "../data/productItems"

export const DEFAULT_GET_COUNT: number = 5;

let sortedProductItemsByScore: ProductItem[] = []

export const makeSortedProductItemsByScore = (): void => {
    sortedProductItemsByScore = sortProductItems();
    if (sortedProductItemsByScore.length)
        sortedProductItemsByScore = 빈값대응(sortedProductItemsByScore);
    else

        console.log(sortedProductItemsByScore)
}

const sortProductItems = (): ProductItem[] => {
    if (!ProductItems.length) return []
    return ProductItems
        .sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
}

const 빈값대응 = (빈값있을지도: ProductItem[]): ProductItem[] => {
    return 빈값있을지도
}

export const getProductItems = (existCount: number = 1): ProductItem[] => {
    let start: number = 0;
    let end: number = 0;

    if (existCount === 1) {
        end = DEFAULT_GET_COUNT
    } else {
        start = (existCount - 1) * DEFAULT_GET_COUNT
        end = start + DEFAULT_GET_COUNT
    }

    return sortedProductItemsByScore.slice(start, end)
}

export const getProductTotalCount = (): number => {
    return sortedProductItemsByScore.length
}

import { ProductItem } from '../models';
import ProductItems from "../data/productItems"
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_GET_COUNT: number = 5;

let sortedProductItemsByScore: ProductItem[] = []

export const makeSortedProductItemsByScore = (): void => {
    sortedProductItemsByScore = sortProductItems();
    if (sortedProductItemsByScore.length)
        sortedProductItemsByScore = fillEmptyElement(sortedProductItemsByScore);
    else
        console.error('no data!')
}

const sortProductItems = (): ProductItem[] => {
    if (!ProductItems.length) return []
    return ProductItems
        .sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
}

const fillEmptyElement = (sortedProductItemsByScore: ProductItem[]): ProductItem[] => {
    sortedProductItemsByScore.forEach(product => {
        if (!product.id) {
            console.error('해당 product의 아이디값이 없습니다. => ', product)
            console.error('임의의 ID를 생성합니다.')
            product.id = uuidv4();
        }
    })
    return sortedProductItemsByScore
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

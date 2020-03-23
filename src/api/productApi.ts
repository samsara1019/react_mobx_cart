import { ProductItem } from '../models';
import { getProductItemsGromGist } from '../data/productItems';
import _ from 'lodash';

export const DEFAULT_GET_COUNT: number = 15;

let productList: ProductItem[] = []

export const fetchProductList = async (sortType: string) => {
    let rawProductList = await getProductItemsGromGist();
    if (sortType === 'row') {
        productList = _.orderBy(
            rawProductList,
            'price',
            'asc'
        );
    } else if (sortType === 'high') {
        productList = _.orderBy(
            rawProductList,
            'price',
            'desc'
        );
    } else {
        productList = rawProductList;
    }
}

export const getProductItems = (start: number = 0): { productListSlice: ProductItem[], isMore: boolean } => {
    const end: number = (start + DEFAULT_GET_COUNT);
    const isMore: boolean = end < productList.length;
    const productListSlice = productList.slice(start, end);
    return { productListSlice, isMore }
}

export const getProductTotalCount = (): number => {
    return productList.length;
}


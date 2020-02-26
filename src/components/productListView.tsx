
import React, { useState, useEffect } from 'react';
import { ProductItem } from "../models"
import { getProductItems, makeSortedProductItemsByScore } from "../api/productApi"
import Product from "./product"
import { inject, observer } from 'mobx-react';

import {
    useParams
} from "react-router-dom";

import "../css/components/productList.scss"


const ProductListView: React.FC<{ products: ProductItem[] }> = ({ onPut, products }: any, ) => {
    const [ProductItems, setProductItems] = useState([] as ProductItem[])
    const { page } = useParams();

    useEffect(() => {
        makeSortedProductItemsByScore()
    }, [])

    useEffect(() => {
        const str: number = Number(page || 1);
        setProductItems(getProductItems(str))
    }, [page]);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [ProductItems]);


    return (
        <div className="productListWrap">
            {ProductItems.map((productItem) => (
                <Product
                    key={productItem.id}
                    ProductItem={productItem}
                    onPut={onPut}
                    products={products}
                />
            ))}
        </div>
    )
}

export default inject(({ cart }) => ({
    onPut: cart.put,
}))(observer(ProductListView));
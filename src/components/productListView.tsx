
import React, { useState, useEffect } from 'react';
import { ProductItem } from "../models"
import { getProductItems, makeSortedProductItemsByScore } from "../api/productApi"
import Product from "./product"
import { inject, observer } from 'mobx-react';

import {
    useParams
} from "react-router-dom";

import "../css/components/productList.scss"

interface ProductListViewProps {
    products: ProductItem[];
    onPut?: (product: ProductItem) => void
}
const ProductListView: React.FC<ProductListViewProps> = ({ onPut = (() => { }), products }) => {
    const [ProductItems, setProductItems] = useState([] as ProductItem[])
    const { page } = useParams();

    useEffect(() => {
        makeSortedProductItemsByScore()
    }, [])

    useEffect(() => {
        const str: number = Number(page || 1);
        setProductItems(getProductItems(str))
    }, [page]);

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
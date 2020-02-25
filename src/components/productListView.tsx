
import React, { useState, useEffect } from 'react';
import { ProductItem } from "../models"
import { getProductItems, makeSortedProductItemsByScore } from "../api/productApi"
import Product from "./product"
import { inject, observer } from 'mobx-react';

import {
    useParams
} from "react-router-dom";

import "../css/components/productList.scss"


const ProductListView: React.FC = ({ onPut, products }: any) => {
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
            page is : {page}
            products : {products.map((p: ProductItem) => (<div>{p.id}</div>))}
            {ProductItems.map((productItem) => (
                <Product
                    key={productItem.id}
                    ProductItem={productItem}
                    onPut={onPut}
                />
            ))}
        </div>
    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
    onPut: cart.put,
}))(observer(ProductListView));
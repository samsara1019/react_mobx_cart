
import React, { useState, useEffect } from 'react';
import { ProductItem } from "../models"
import { getProductItems, makeSortedProductItemsByScore } from "../api/productApi"
import Product from "./product"

import {
    useParams
} from "react-router-dom";

import "../css/components/productList.scss"


const ProductListView = () => {
    const [ProductItems, setProductItems] = useState([] as ProductItem[])

    let { page } = useParams();

    useEffect(() => {
        makeSortedProductItemsByScore()
    }, [])

    useEffect(() => {
        let str = page as any as number;
        setProductItems(getProductItems(str))
    }, [page]);


    return (
        <div className="productListWrap">
            page is : {page}
            {ProductItems.map((productItem) => (
                <Product
                    key={productItem.id}
                    id={productItem.id}
                    title={productItem.title}
                    coverImage={productItem.coverImage}
                    price={productItem.price}
                    score={productItem.score}
                />
            ))}
        </div>
    )
}

export default ProductListView;
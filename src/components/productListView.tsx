
import React, { useState, useEffect } from 'react';
import { ProductItem } from "../models"
import { getProductItems, makeSortedProductItemsByScore } from "../api/productApi"
import Product from "./product"
import productItems from '../data/productItems';


const ProductListView = () => {
    const [ProductItems, setProductItems] = useState([] as ProductItem[])

    useEffect(() => {
        makeSortedProductItemsByScore()
        setProductItems(getProductItems())
    }, [])


    return (
        <div className="productListWrap">
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
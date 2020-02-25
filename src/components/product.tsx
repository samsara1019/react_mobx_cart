
import * as React from 'react';
import { ProductItem } from "../models"
import "../css/components/product.scss"

const Products: React.FC<{ ProductItem: ProductItem, onPut: any }> = ({ ProductItem, onPut }) => {
    return (
        <div className="productWrap">
            <img className="productCoverImage" src={ProductItem.coverImage} alt="" />
            {ProductItem.title}
            {ProductItem.price}
            <button onClick={() => onPut(ProductItem)}>to cart</button>
        </div>
    )
}

export default Products;
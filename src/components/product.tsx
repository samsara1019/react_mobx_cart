
import * as React from 'react';
import { ProductItem } from "../models"
import "../css/components/product.scss"

const Products: React.FC<ProductItem> = ({ coverImage, title, price }) => {
    return (
        <div className="productWrap">
            <img className="productCoverImage" src={coverImage} alt="" />
            {title}
            {price}
        </div>
    )
}

export default Products;
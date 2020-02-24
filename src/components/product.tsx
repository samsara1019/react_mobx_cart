
import * as React from 'react';
import { ProductItem } from "../models"
import "../css/components/product.scss"

const Products = (props: ProductItem) => {
    return (
        <div className="productWrap">
            <img className="productCoverImage" src={props.coverImage} alt="" />
            {props.title}
            {props.price}
        </div>
    )
}

export default Products;

import * as React from 'react';
import { ProductItem } from "../models"

const Products = (props: ProductItem) => {
    return (
        <img src={props.coverImage} alt="" />
    )
}

export default Products;
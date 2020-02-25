
import * as React from 'react';
import { ProductItem } from "../models"
import "../css/components/product.scss"

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

interface productProps {
    ProductItem: ProductItem;
    onPut: any;
    products: ProductItem[];
}

const Products: React.FC<productProps> = ({ ProductItem, onPut, products }) => {
    const CartIcon = () => {
        if (!products.find(p => p.id === ProductItem.id)) {
            return <AddShoppingCartIcon />;
        } else {
            return <RemoveShoppingCartIcon />;

        }
    };


    return (
        <div className="productWrap">
            <div className="productTop"
                style={{ backgroundImage: `url(${ProductItem.coverImage})` }}>
            </div>
            <div className="productBottom">
                <div className="title">
                    {ProductItem.title}
                </div>
                <div className="price">
                    <div>
                        {ProductItem.price.toLocaleString()}원
                    </div>
                </div>
                <IconButton color="primary" aria-label="add to shopping cart"
                    className="cartButton" onClick={() => onPut(ProductItem)}>
                    <CartIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Products;
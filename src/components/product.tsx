
import React, { useEffect } from 'react';
import { ProductItem } from "../models"
import "../css/components/product.scss"

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import { inject, observer } from 'mobx-react';

interface productProps {
    ProductItem: ProductItem;
    onPut: any;
    products?: ProductItem[];
}

const Products: React.FC<productProps> = ({ ProductItem, onPut, products = [] }) => {
    const MAX_CART_SIZE: number = 3;

    useEffect(() => {
        console.log('rendered')
    }, [JSON.stringify(products)])

    const CartIcon = () => {
        if (!products.find(p => p.id === ProductItem.id)) {
            return <AddShoppingCartIcon />;
        } else {
            return <RemoveShoppingCartIcon />;

        }
    };

    const checkCountBeforeOnPut = (ProductItem: ProductItem) => {
        const exists = products.find(sProduct => sProduct.id === ProductItem.id);

        if (!exists && products.length >= MAX_CART_SIZE) {
            alert(`상품을 ${MAX_CART_SIZE}개 이상 담을 수 없습니다.`)
            return;
        }
        onPut(ProductItem)
    }

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
                    className="cartButton" onClick={() => checkCountBeforeOnPut(ProductItem)}>
                    <CartIcon />
                </IconButton>
            </div>
        </div>
    )
}
export default inject(({ cart }) => ({
    products: cart.selectedProducts as ProductItem[],
}))(observer(Products));


import React, { useEffect } from 'react';

import { ProductItem } from "../models"
import "../css/components/product.scss"

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Grow from '@material-ui/core/Grow';

import { inject, observer } from 'mobx-react';

interface productProps {
    ProductItem: ProductItem;
    onPut: any;
    products?: ProductItem[];
    isInCart?: any;
    changeToastObject?: any;
}

const Products: React.FC<productProps> = ({ ProductItem, onPut, products = [], isInCart, changeToastObject }) => {
    const MAX_CART_SIZE: number = 3;
    useEffect(() => {
        console.log('rendered')
    }, [isInCart(ProductItem.id)])

    const CartIcon = () => {
        if (!isInCart(ProductItem.id)) {
            return <AddShoppingCartIcon />;
        } else {
            return <RemoveShoppingCartIcon />;

        }
    };

    const checkCountBeforeOnPut = (ProductItem: ProductItem) => {
        const exists = products.find(sProduct => sProduct.id === ProductItem.id);

        if (!exists && products.length >= MAX_CART_SIZE) {
            changeToastObject(
                { toastText: `😢 ${MAX_CART_SIZE}개 이상은 넣을 수 없어요.`, toastType: 'warning' }
            );
            return;
        }
        onPut(ProductItem)
    }

    return (
        <Grow in={true}>
            <div className="productWrap">
                <div className="productTop">
                    <div className="productImage"
                        style={{ backgroundImage: `url(${ProductItem.coverImage})` }}>
                    </div>
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
        </Grow>

    )
}
export default inject(({ cart, toast }) => ({
    products: cart.selectedProducts as ProductItem[],
    isInCart: cart.isInCart,
    changeToastObject: toast.changeToastObject
}))(observer(Products));

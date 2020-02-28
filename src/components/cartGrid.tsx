
import * as React from 'react';
import CartItem from "./cartItem";
import CartEmpty from "./cartEmpty"

import { CartProductItem } from "../models"
import { inject, observer } from 'mobx-react';
import "../css/components/cartGrid.scss"
import Checkbox from '@material-ui/core/Checkbox';

interface CartGridProps {
    products?: CartProductItem[];
    changeCheckedAll?: (newCheckValue: boolean) => void
}
const CartGrid: React.FC<CartGridProps> = ({ products = [], changeCheckedAll = (() => { }) }) => {

    return (
        <div className="CartGridWrap">
            <div className="header">
                <Checkbox
                    color="primary"
                    onChange={(e) => changeCheckedAll(e.target.checked)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <div className="header">강좌명</div>
            <div className="header">단가</div>
            <div className="header">수량</div>
            <div className="header">가격</div>
            <div className="header">삭제</div>

            {products.length ?
                products.map((product: CartProductItem) =>
                    <CartItem product={product} key={product.id} />
                )
                : <CartEmpty />}
        </div>
    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
    changeCheckedAll: cart.changeCheckedAll,
}))(observer(CartGrid));

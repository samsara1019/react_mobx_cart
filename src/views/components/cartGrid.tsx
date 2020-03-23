
import * as React from 'react';
import CartItem from './cartItem';
import CartEmpty from './cartEmpty';

import { CartProductItem } from '../../models'

import { inject, observer } from 'mobx-react';

import Checkbox from '@material-ui/core/Checkbox';

import '../../css/components/cartGrid.scss'

interface CartGridProps {
    productList?: CartProductItem[];
    changeCheckedAll?: (newCheckValue: boolean) => void
}

const CartGrid: React.FC<CartGridProps> = ({ productList = [], changeCheckedAll = (() => { }) }) => {
    return (
        <div className='cartGridWrap'>
            <div className='header'>
                <Checkbox
                    color='primary'
                    onChange={(e) => changeCheckedAll(e.target.checked)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <div className='header'>상품명</div>
            <div className='header'>단가</div>
            <div className='header'>수량</div>
            <div className='header'>가격</div>
            <div className='header'>삭제</div>

            {productList.length ?
                productList.map((product: CartProductItem) =>
                    <CartItem product={product} key={product.id} />
                )
                : <CartEmpty />}
        </div>
    )
}

export default inject(({ cart }) => ({
    productList: cart.cartList,
    changeCheckedAll: cart.changeCheckedAll,
}))(observer(CartGrid));

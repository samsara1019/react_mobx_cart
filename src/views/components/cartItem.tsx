import * as React from 'react';

import { CartProductItem, ProductItem } from '../../models';

import { inject, observer } from 'mobx-react';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface CartItemProps {
    product: CartProductItem;
    onTake?: (product: ProductItem) => void;
    changeChecked?: (productId: string) => void;
    changeCount?: (productId: string, newCount: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onTake = (() => { }), changeChecked = (() => { }), changeCount = (() => { }) }) => {
    const MIN_CART_COUNT = 1;
    const MAX_CART_COUNT = 9999;

    const countChanged = (e: any, productId: string) => {
        const input = document.getElementById(`numberField-${productId}`) as any;
        const newCount = parseFloat(e.target.value);

        if (!Number.isInteger(newCount) || newCount <= 0) {
            input.value = MIN_CART_COUNT
        } else if (newCount > MAX_CART_COUNT) {
            input.value = MAX_CART_COUNT
        }

        changeCount(productId, newCount)
    }

    const getTotalPrice = (price: number = 0, count: number = 0): string => {
        const total: number = price * count;
        return total.toLocaleString()
    }

    return (
        <div className='content'>
            <div className='verticalCenter padding5'>
                <Checkbox
                    checked={product.ischecked}
                    color='primary'
                    onChange={() => changeChecked(product.id)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <div className='verticalCenter'>{product.title}</div>
            <div className='verticalCenter'>{product.price.toLocaleString()}</div>
            <div className='verticalCenter'>
                <TextField
                    id={`numberField-${product.id}`}
                    type='number'
                    defaultValue={product.count}
                    onInput={(e) => countChanged(e, product.id)}
                    inputProps={{ min: MIN_CART_COUNT, max: MAX_CART_COUNT }}
                    error={product.count < 1}
                    helperText={product.count < 1 ? '1개 이상 선택해주세요.' : ''}
                />
            </div>
            <div className='verticalCenter'>{getTotalPrice(product.price, product.count)}</div>
            <div className='verticalCenter'>
                <IconButton aria-label='delete' size='small' onClick={() => onTake(product)}>
                    <DeleteIcon fontSize='inherit' />
                </IconButton>
            </div>
        </div>
    )
}

export default inject(({ cart }) => ({
    changeCount: cart.changeCount,
    changeChecked: cart.changeChecked,
    onTake: cart.take,
}))(observer(CartItem));

import * as React from 'react';
import { CartProductItem } from "../models"

import { inject, observer } from 'mobx-react';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface CartItemProps {
    product: CartProductItem;
    onTake?: any;
    changeChecked?: any;
    changeCount?: any;
}
const CartItem: React.FC<CartItemProps> = ({ product, onTake, changeChecked, changeCount }) => {
    const countChanged = (e: any, productId: string) => {
        const input = document.getElementById(`numberField-${productId}`) as any;

        const newCount = parseFloat(e.target.value);

        if (!Number.isInteger(newCount) || newCount <= 0) {
            if (input) input.value = 1
        }

        changeCount(productId, newCount)
    }

    const getTotalPrice = (price: number = 0, count: number = 0): string => {
        const total: number = price * count;
        return total.toLocaleString()
    }

    return (
        <div className="content" >
            <div>
                <Checkbox
                    checked={product.ischecked}
                    color="primary"
                    onChange={() => changeChecked(product.id)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <div>{product.title}</div>
            <div>{product.price.toLocaleString()}</div>
            <div>
                <TextField
                    id={`numberField-${product.id}`}
                    type="number"
                    defaultValue={product.count}
                    onInput={(e) => countChanged(e, product.id)}
                    inputProps={{ min: "1" }}
                    error={product.count < 1}
                    helperText={product.count < 1 ? "1개 이상 선택해주세요." : ''}
                />
            </div>
            <div>{getTotalPrice(product.price, product.count)}</div>
            <div>
                <IconButton aria-label="delete" size="small" onClick={() => onTake(product)}>
                    <DeleteIcon fontSize="inherit" />
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

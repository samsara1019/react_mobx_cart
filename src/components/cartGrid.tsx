
import * as React from 'react';
import { CartProductItem } from "../models"
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import "../css/components/cartGrid.scss"

const CartGrid: React.FC = ({ products, changeCount, changeCheckedAll, changeChecked, onTake }: any) => {

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
            <div className="header"><button>remove</button></div>

            {products.map((product: CartProductItem) =>
                (
                    <div className="content" key={product.id}>
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
                        <div><button onClick={() => onTake(product)}>remove</button></div>
                    </div>

                ))}
        </div>
    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
    changeCount: cart.changeCount,
    changeCheckedAll: cart.changeCheckedAll,
    changeChecked: cart.changeChecked,
    onTake: cart.take,
}))(observer(CartGrid));

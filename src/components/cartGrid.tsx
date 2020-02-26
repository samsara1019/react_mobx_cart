
import * as React from 'react';
import { CartProductItem } from "../models"
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import "../css/components/cartGrid.scss"

const CartGrid: React.FC = ({ products, changeCount, changeCheckedAll, changeChecked }: any) => {
    const countChanged = (e: any, productId: string) => {
        changeCount(productId, Number(e.target.value))
    }
    const getTotalPrice = (price: number = 0, count: number = 0): string => {
        const total: number = price * count;
        return total.toLocaleString()
    }
    return (
        <div className="CartGridWrap">
            <div>
                <Checkbox
                    color="primary"
                    onChange={(e) => changeCheckedAll(e.target.checked)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <div>
                강좌명
            </div>
            <div>
                수량
            </div>
            <div>
                단가
            </div>
            <div>
                가격
            </div>

            {products.map((product: CartProductItem) =>
                (
                    <template className="content" key={product.id}>
                        <div>
                            <Checkbox
                                checked={product.ischecked}
                                color="primary"
                                onChange={() => changeChecked(product.id)}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                        <div>{product.title}</div>
                        <div>
                            <TextField
                                id={`numberField-${product.id}`}
                                type="number"
                                defaultValue={product.count}
                                onChange={(e) => countChanged(e, product.id)}
                                inputProps={{ min: "1" }}
                                error={product.count < 1}
                                helperText={product.count < 1 ? "1개 이상 선택해주세요." : ''}
                            />
                        </div>
                        <div>{product.price.toLocaleString()}</div>
                        <div>{getTotalPrice(product.price, product.count)}</div>
                    </template>

                ))}
        </div>
    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
    changeCount: cart.changeCount,
    changeCheckedAll: cart.changeCheckedAll,
    changeChecked: cart.changeChecked
}))(observer(CartGrid));

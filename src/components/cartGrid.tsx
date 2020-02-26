
import * as React from 'react';
import { ProductItem } from "../models"
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import "../css/components/cartGrid.scss"

const CartGrid: React.FC = ({ products }: any) => {
    const countChanged = (e: any) => {
        console.log(e.target.value)
    }
    return (
        <div className="CartGridWrap">
            <div>
                강좌명
            </div>
            <div>
                수량
            </div>
            <div>
                가격
            </div>

            {products.map((product: ProductItem) =>
                (
                    <template className="content" key={product.id}>
                        <div>{product.title}</div>
                        <div>
                            <TextField
                                id={`numberField-${product.id}`}
                                type="number"
                                defaultValue="1"
                                onChange={(e) => countChanged(e)}
                                inputProps={{ min: "1" }}
                            />
                        </div>
                        <div>{product.price}</div>
                    </template>

                ))}
        </div>
    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
}))(observer(CartGrid));

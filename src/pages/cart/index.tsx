
import * as React from 'react';
import { ProductItem } from "../../models"
import { inject, observer } from 'mobx-react';

const Cart: React.FC = ({ products }: any) => {
    return (
        <div>Cart Page
            products :
            {products.map((product: ProductItem) =>
            (<div key={product.id}>{product.title}</div>
            ))}
        </div>
    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
}))(observer(Cart));

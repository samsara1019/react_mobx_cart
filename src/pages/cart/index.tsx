
import * as React from 'react';
import CartGrid from "../../components/cartGrid"
import CardTotal from "../../components/cartTotal"


const Cart: React.FC = () => {
    return (
        <div>
            <CartGrid />
            <CardTotal />
        </div>
    )
}

export default Cart
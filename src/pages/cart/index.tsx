
import * as React from 'react';
import CartGrid from "../../components/cartGrid"

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { inject, observer } from 'mobx-react';

const Cart: React.FC = ({ totalPrice }: any) => {
    return (
        <div>
            Cart Page
            <CartGrid />
            총합(원래가격) : {totalPrice}
        </div>
    )
}

export default inject(({ cart }) => ({
    totalPrice: cart.totalPrice,
}))(observer(Cart));

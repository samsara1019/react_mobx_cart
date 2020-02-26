
import * as React from 'react';
import CartGrid from "../../components/cartGrid"

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { inject, observer } from 'mobx-react';

import coupons from "../../data/coupons"


const Cart: React.FC = ({ totalPrice, totalDiscountedPrice, selectedCoupon, selectCoupon }: any) => {
    return (
        <div>
            Cart Page
            <CartGrid />
            총합(원래가격) : {totalPrice}

            할인가 : {totalDiscountedPrice}
            <FormControl>
                <Select value={selectedCoupon.title} onChange={(e) => selectCoupon(e.target.value)} displayEmpty>
                    <MenuItem value="">
                        <em>쿠폰 적용 안함</em>
                    </MenuItem>
                    {
                        coupons.map((coupon) =>
                            (<MenuItem value={JSON.stringify(coupon)}>{coupon.title}</MenuItem>)
                        )
                    }
                </Select>
                <FormHelperText>쿠폰을 선택하세요.</FormHelperText>
            </FormControl>
        </div>
    )
}

export default inject(({ cart }) => ({
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    selectedCoupon: cart.selectedCoupon,
    selectCoupon: cart.selectCoupon
}))(observer(Cart));

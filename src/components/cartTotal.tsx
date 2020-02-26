import * as React from 'react';

import { inject, observer } from 'mobx-react';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import coupons from "../data/coupons"

import "../css/components/cartTotal.scss"


const CartTotal: React.FC = ({ totalPrice, totalDiscountedPrice, selectedCoupon, selectCoupon }: any) => {
    return (
        <div className="CartTotalWrap">
            <h1>결제정보</h1>
            <div className="content">
                <div>
                    상품 금액
                </div>
                <div className="ToRight">
                    {totalPrice}
                </div>
                <div>
                    쿠폰
                </div>
                <FormControl className="ToRight">
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
            <div>
                최종 결제 금액
            </div>

            <div className="ToRight">
                {totalDiscountedPrice}
            </div>
        </div>
    )
}

export default inject(({ cart }) => ({
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    selectedCoupon: cart.selectedCoupon,
    selectCoupon: cart.selectCoupon
}))(observer(CartTotal));

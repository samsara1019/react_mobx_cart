import * as React from 'react';

import { Coupon, CartProductItem, ToastObject } from '../../models';
import coupons from '../../data/coupons';

import { inject, observer } from 'mobx-react';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';


import '../../css/components/cartReceipt.scss';

interface CartReceiptProps {
    totalPrice?: number;
    totalDiscountedPrice?: number;
    selectedCoupon?: Coupon;
    selectCoupon?: (context: any) => void;
    productList?: CartProductItem[];
    changeToastObject?: (newToastObject: ToastObject) => void;
}

const CartReceipt: React.FC<CartReceiptProps>
    = ({ totalPrice = 0,
        totalDiscountedPrice = 0,
        selectedCoupon = {},
        selectCoupon = (() => { }),
        productList = [],
        changeToastObject = (() => { })
    }) => {
        return (
            <div className='cartReceiptWrap'>
                <h1>결제정보</h1>
                <div className='content'>
                    <div>
                        상품 금액
                    </div>
                    <div className='toRight'>
                        {totalPrice.toLocaleString()}원
                    </div>
                    <div className='verticalCenter'>
                        쿠폰
                    </div>
                    <FormControl className='toRight'>
                        <Select value={selectedCoupon.title || ''} onChange={(e, context) => selectCoupon(context)} displayEmpty>
                            <MenuItem value=''>
                                <em>쿠폰 적용 안함</em>
                            </MenuItem>
                            {
                                coupons.map((coupon, index) =>
                                    (<MenuItem data-model={coupon} value={coupon.title} key={index}>{coupon.title}</MenuItem>)
                                )
                            }
                        </Select>
                        <FormHelperText>쿠폰을 선택하세요.</FormHelperText>
                    </FormControl>
                </div>
                <div>
                    최종 결제 금액
                </div>

                <div className='toRight totalDiscountedPrice'>
                    {totalDiscountedPrice.toLocaleString().split('.')[0]}원
                </div>
                <Button
                    disabled={!productList.length}
                    variant='contained'
                    color='primary'
                    endIcon={<LocalFloristIcon />}
                    onClick={() => changeToastObject({ toastText: `😎 준비중입니다!`, toastType: 'info' })}
                >
                    구매하기
                </Button>
            </div>
        )
    }

export default inject(({ cart, toast }) => ({
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    selectedCoupon: cart.selectedCoupon,
    selectCoupon: cart.selectCoupon,
    productList: cart.cartList,
    changeToastObject: toast.changeToastObject
}))(observer(CartReceipt));

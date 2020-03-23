import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist'
import { ProductItem, CartProductItem, Coupon } from '../models'
import { createTransformer } from 'mobx-utils'
export default class MarketStore {
    @persist('list') @observable cartList = [] as CartProductItem[];
    @persist('object') @observable selectedCoupon = {} as Coupon;

    @action
    put = (product: ProductItem): void => {
        const exists = this.cartList.find(cart => cart.id === product.id);
        if (!exists) {
            this.cartList.push({ ...product, count: 1, ischecked: true });
        } else {
            this.take(product)
        }
    };

    @action
    take = (product: ProductItem): void => {
        const cartIndexToTake: number = this.cartList.findIndex(cart => cart.id === product.id)
        this.cartList.splice(cartIndexToTake, 1);
    };

    @action
    changeCheckedAll = (newCheckValue: boolean): void => {
        this.cartList.forEach(cart => {
            cart.ischecked = newCheckValue
        });
    }

    @action
    changeChecked = (productId: string): void => {
        const cartToChangeChecked = this.cartList.find(cart => cart.id === productId);
        if (cartToChangeChecked)
            cartToChangeChecked.ischecked = !cartToChangeChecked.ischecked;
    }

    @action
    changeCount = (productId: string, newCount: number): void => {
        const cartToChangeCount = this.cartList.find(cart => cart.id === productId);

        if (cartToChangeCount) {
            cartToChangeCount.count = newCount > 0 ? newCount : 1;
        }
    }
    @action
    selectCoupon = (context: any): void => {
        const dataModel = context.props['data-model'];
        if (!dataModel) this.selectedCoupon = {} as Coupon
        else {
            this.selectedCoupon = Object.assign(dataModel);
        }
    }

    @computed
    get totalPrice(): number {
        return this.cartList.reduce((previous, current) => {
            if (current.ischecked)
                return previous + current.price * current.count;
            else
                return previous
        }, 0);
    }

    @computed
    get totalDiscountedPrice(): number {
        if (Object.keys(this.selectedCoupon).length === 0) {
            return this.totalPrice
        }
        let priceWithRateDiscount = this.cartList.reduce((previous, current) => {
            if (current.ischecked) {
                let price = current.price
                if (this.selectedCoupon.type === 'rate') {
                    price -= price * ((this.selectedCoupon.discountRate || 0) / 100)
                }
                return previous + price * current.count;
            }
            else
                return previous
        }, 0)

        if (this.selectedCoupon.type === 'amount' && priceWithRateDiscount)
            priceWithRateDiscount -= this.selectedCoupon.discountAmount || 0

        return priceWithRateDiscount
    }


    @computed
    get isInCart() {
        return createTransformer((productId: string): boolean => {
            const target = this.cartList.find(cart => cart.id === productId)
            return !!target;
        })
    }

}
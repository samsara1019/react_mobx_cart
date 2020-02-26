import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist'
import { ProductItem, CartProductItem } from "../models"

export default class MarketStore {
    @persist('list') @observable selectedProducts = [] as CartProductItem[];

    @action
    put = (product: ProductItem) => {
        const exists = this.selectedProducts.find(sProduct => sProduct.id === product.id);
        if (!exists) {
            this.selectedProducts.push({ ...product, count: 1, ischecked: true });
        } else {
            this.take(product)
        }
    };

    @action
    take = (product: ProductItem) => {
        const productIndexToTake: number = this.selectedProducts.findIndex(sProduct => sProduct.id === product.id)
        this.selectedProducts.splice(productIndexToTake, 1);
    };

    @action
    changeCheckedAll = (newCheckValue: boolean) => {
        this.selectedProducts.forEach(product => {
            product.ischecked = newCheckValue
        });
    }

    @action
    changeChecked = (productId: string) => {
        const productToChangeChecked = this.selectedProducts.find(sProduct => sProduct.id === productId);
        if (productToChangeChecked)
            productToChangeChecked.ischecked = !productToChangeChecked.ischecked;
    }

    @action
    changeCount = (productId: string, newCount: number) => {
        const productToChangeCount = this.selectedProducts.find(sProduct => sProduct.id === productId);

        if (productToChangeCount) {
            productToChangeCount.count = newCount > 0 ? newCount : 1;
        }
    }

    // calculateProductFianlPrice=(product: CartProductItem)=>{
    //     const 
    //     //퍼센트 쿠폰이 있다면 , 쿠폰 적용 상품이라면 다시 계산~
    // }

    @computed
    get totalPrice() {
        return this.selectedProducts.reduce((previous, current) => {
            if (current.ischecked)
                return previous + current.price * current.count;
            else
                return previous
        }, 0);
    }
}
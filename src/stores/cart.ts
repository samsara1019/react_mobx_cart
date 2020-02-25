import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist'
import { ProductItem } from "../models"
export default class MarketStore {
    @persist('list') @observable selectedProducts = [] as ProductItem[];

    @action
    put = (product: ProductItem) => {
        const exists = this.selectedProducts.find(sProduct => sProduct.id === product.id);
        if (!exists) {
            this.selectedProducts.push(product);
        } else {
            this.take(product)
        }
    };

    @action
    take = (product: ProductItem) => {
        const productIndexToTake: number = this.selectedProducts.findIndex(sProduct => sProduct.id === product.id)
        this.selectedProducts.splice(productIndexToTake, 1);
    };

}
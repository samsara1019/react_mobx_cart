import { observable, action } from 'mobx';
export default class OrderStore {
    @observable orderType = '';
    @action
    chagneOrderType = (newOrderType: string): void => {
        this.orderType = newOrderType;
    }
}
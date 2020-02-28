import { observable, action } from 'mobx';
import { ToastObject } from "../models"

export default class ToastStore {
    @observable toastObject = {} as ToastObject;

    @action
    changeToastObject = (newToastObject: ToastObject) => {
        this.toastObject = newToastObject;
    };

}

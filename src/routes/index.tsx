import * as React from 'react';

import { Provider } from 'mobx-react';
import CartStore from "../stores/cart";
import ToastStore from "../stores/toast";
import { create } from 'mobx-persist';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Toast from "../components/toast"
import Header from "../components/header"
import Products from "../pages/products"
import Cart from "../pages/cart"

import "../css/index.scss"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const hydrate = create({})
const cartStore = new CartStore()
const toastStore = new ToastStore()
hydrate('cart', cartStore)

const Root: React.FC = () => (
    <Provider cart={cartStore} toast={toastStore}>
        <BrowserRouter >
            <div className="wrap">
                <Toast />
                <Header />
                <div className="bodyWrap">
                    <Switch>
                        <Route path="/" exact component={Products} />
                        <Route path="/products/:page" component={Products} />
                        <Route path="/cart" component={Cart} />
                        <Redirect path="*" to="/" />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
)

export default Root
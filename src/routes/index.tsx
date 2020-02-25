import * as React from 'react';

import { Provider } from 'mobx-react';
import CartStore from "../stores/cart"
import { create } from 'mobx-persist'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Products from "../pages/products"
import Cart from "../pages/cart"


const hydrate = create({})
const cart = new CartStore()
hydrate('cart', cart)
    .then(() => console.log('appState hydrated'))

const Root: React.FC = () => (
    <Provider cart={cart}>
        <BrowserRouter >
            <Switch >
                <Route path="/" exact component={Products} />
                <Route path="/products/:page" component={Products} />
                <Route path="/cart" component={Cart} />
                <Redirect path="*" to="/" />
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default Root;
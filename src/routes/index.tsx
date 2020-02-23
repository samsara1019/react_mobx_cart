import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Products from "../pages/products"
import Cart from "../pages/cart"


const Root: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products" component={Products} />
            <Route path="/cart" component={Cart} />
            <Redirect path="*" to="/" />
        </Switch>
    </BrowserRouter>
)

export default Root;
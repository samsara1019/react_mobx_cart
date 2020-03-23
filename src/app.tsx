import * as React from 'react';
import Toast from './views/components/toast';
import Header from './views/components/header';
import Product from './views/pages/product';
import Cart from './views/pages/cart';

import { Provider } from 'mobx-react';
import { create } from 'mobx-persist';

import { toast } from 'react-toastify';
import CartStore from './stores/cart';
import ToastStore from './stores/toast';
import OrderStore from './stores/order';


import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './css/index.scss';

toast.configure();

const hydrate = create({});
const cartStore = new CartStore();
const toastStore = new ToastStore();
const orderStore = new OrderStore();
hydrate('cart', cartStore);

const Root: React.FC = () => (
    <Provider cart={cartStore} toast={toastStore} order={orderStore}>
        <BrowserRouter >
            <div className='wrap'>
                <Toast />
                <Header />
                <div className='bodyWrap'>
                    <Switch>
                        <Route path='/' exact component={Product} />
                        <Route path='/product' component={Product} />
                        <Route path='/cart' component={Cart} />
                        <Redirect path='*' to='/' />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
)

export default Root
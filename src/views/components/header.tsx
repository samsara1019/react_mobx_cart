
import React from 'react';
import Orders from './orders';

import { ProductItem } from '../../models';

import { useHistory, useLocation } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';

import '../../css/components/header.scss';

interface HeaderProps {
    productList?: ProductItem[]
}
const Header: React.FC<HeaderProps> = ({ productList = [] }) => {
    const history = useHistory();
    const { pathname } = useLocation();

    const StyledBadge = withStyles((theme: Theme) =>
        createStyles({
            badge: {
                right: -3,
                top: 13,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
            },
        }),
    )(Badge);

    return (
        <div className='headerWrap'>
            <div className='mainButton'>
                <IconButton className={pathname === '/' ? 'select' : ''} onClick={() => history.push('/')} >
                    메인
                    <StyledBadge color='secondary'>
                        <StoreIcon />
                    </StyledBadge>
                </IconButton>
            </div>
            <div className='cartButton'>
                <IconButton className={pathname === '/cart' ? 'select' : ''} onClick={() => history.push('/cart')} >
                    장바구니
                    <StyledBadge badgeContent={productList.length} color='secondary'>
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </div>
            <Orders />
        </div>
    )
}

export default inject(({ cart }) => ({
    productList: cart.cartList,
}))(observer(Header));
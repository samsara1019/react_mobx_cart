
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ProductItem } from "../models"

import { inject, observer } from 'mobx-react';

import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';

import "../css/components/header.scss"
interface ProductsProp {
    products?: ProductItem[]
}
const Header: React.FC<ProductsProp> = ({ products = [] }) => {
    const history = useHistory();

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
        <div className="headerWrap">
            <div className="mainButton">
                <IconButton aria-label="cart" onClick={() => history.push('/')} >
                    메인
                    <StyledBadge color="secondary">
                        <StoreIcon />
                    </StyledBadge>
                </IconButton>
            </div>
            <div className="cartButton">
                <IconButton aria-label="cart" onClick={() => history.push('/cart')} >
                    장바구니
                    <StyledBadge badgeContent={products.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </div>
        </div>
    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
}))(observer(Header));
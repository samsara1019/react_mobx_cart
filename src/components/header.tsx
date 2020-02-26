
import React from 'react';
import { useHistory } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import "../css/components/header.scss"

const Header: React.FC = ({ products }: any) => {
    const history = useHistory();

    const changePage = (path: string) => {
        history.push(path)
    }

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
            메인으로가즈아
            <div className="CartButton">
                장바구니
                <IconButton aria-label="cart" onClick={() => changePage('/cart')} >
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
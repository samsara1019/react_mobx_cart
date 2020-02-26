
import React, { useState, useEffect } from 'react';
import ProductListView from "../../components/productListView"
import { ProductItem } from "../../models"

import { useHistory } from 'react-router-dom';
import { getProductTotalCount, DEFAULT_GET_COUNT } from "../../api/productApi"

import { inject, observer } from 'mobx-react';


import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import "../../css/pages/products.scss"

const Products: React.FC<{ products: ProductItem[] }> = ({ products }) => {
    let [pageCount, setPageCount] = useState(0 as number);
    const history = useHistory();

    useEffect(() => {
        const totalCount: number = getProductTotalCount()
        setPageCount(Math.ceil(totalCount / DEFAULT_GET_COUNT))

        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, [])

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
        <div>
            <div className="CartButton">
                <IconButton aria-label="cart" onClick={() => changePage('/cart')} >
                    <StyledBadge badgeContent={products.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </div>

            <ProductListView products={products} />
            <div className="PaginationWrap">
                <Pagination count={pageCount}
                    color="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>, number: number) => changePage(`/products/${number}`)} />
            </div>
        </div>

    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
}))(observer(Products));
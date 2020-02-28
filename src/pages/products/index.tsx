
import React, { useState, useEffect } from 'react';
import ProductListView from "../../components/productListView"
import { ProductItem } from "../../models"

import { useHistory } from 'react-router-dom';
import { getProductTotalCount, DEFAULT_GET_COUNT } from "../../api/productApi"

import Pagination from '@material-ui/lab/Pagination';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import "../../css/pages/products.scss"

import { inject, observer } from 'mobx-react';

interface ProductsProp {
    products: ProductItem[]
}
const Products: React.FC<ProductsProp> = ({ products }) => {
    let [pageCount, setPageCount] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const totalCount: number = getProductTotalCount()
        setPageCount(Math.ceil(totalCount / DEFAULT_GET_COUNT))

        const unlisten = history.listen(() => {
            scrollToTop()
        });
        return () => {
            unlisten();
        }
    }, [])


    const scrollToTop = (smooth: boolean = false) => {
        window.scrollTo({
            top: 0,
            behavior: smooth ? 'smooth' : 'auto',
        })
    }

    const changePage = (path: string) => {
        history.push(path)
    }

    return (
        <div className="ProductWrap">
            <ProductListView products={products} />
            <div className="PaginationWrap">
                <Pagination count={pageCount}
                    color="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>, number: number) => changePage(`/products/${number}`)} />
            </div>
            <Fab className="ScrollToTop" color="primary" size="small" aria-label="scroll back to top"
                onClick={() => scrollToTop(true)}>
                <KeyboardArrowUpIcon />
            </Fab>
        </div>

    )
}

export default inject(({ cart }) => ({
    products: cart.selectedProducts,
}))(observer(Products));
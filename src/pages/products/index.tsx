
import React, { useState, useEffect } from 'react';
import ProductListView from "../../components/productListView"

import { useHistory } from 'react-router-dom';
import { getProductTotalCount, DEFAULT_GET_COUNT } from "../../api/productApi"

import Pagination from '@material-ui/lab/Pagination';

import "../../css/pages/products.scss"

import { inject, observer } from 'mobx-react';

const Products: React.FC = ({ products }: any) => {
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

    return (
        <div>
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
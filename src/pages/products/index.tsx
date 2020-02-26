
import React, { useState, useEffect } from 'react';
import ProductListView from "../../components/productListView"
import { useHistory } from 'react-router-dom';
import { getProductTotalCount, DEFAULT_GET_COUNT } from "../../api/productApi"

import Pagination from '@material-ui/lab/Pagination';
import "../../css/pages/products.scss"

const Products: React.FC = () => {
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

    const onPagePage = (e: React.ChangeEvent<HTMLInputElement>, number: number) => {
        history.push(`/products/${number}`)
    }
    return (
        <div>
            <ProductListView />
            <div className="PaginationWrap">
                <Pagination count={pageCount}
                    color="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>, number: number) => onPagePage(e, number)} />
            </div>
        </div>

    )
}

export default Products;
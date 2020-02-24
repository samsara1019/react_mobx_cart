
import React, { useState, useEffect } from 'react';
import ProductListView from "../../components/productListView"
import { Link } from 'react-router-dom';
import { getProductTotalCount, DEFAULT_GET_COUNT } from "../../api/productApi"

const Products: React.FC = () => {
    const [pageList, setPageList] = useState([] as number[])
    useEffect(() => {
        const totalCount = getProductTotalCount()
        const pageCount = totalCount / DEFAULT_GET_COUNT
        for (let i = 1; i < pageCount + 1; i++) {
            setPageList(oldArray => [...oldArray, i]);
        }
    }, [])
    return (
        <div>
            {pageList.map((page) =>
                <Link key={page} to={`/products/${page}`}>{page}</Link>
            )}
            <ProductListView />
        </div>

    )
}

export default Products;
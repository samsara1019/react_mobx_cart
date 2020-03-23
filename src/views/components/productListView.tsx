
import React, { useState, useEffect } from 'react';

import { ProductItem } from '../../models';
import { getProductItems, fetchProductList } from '../../api/productApi';
import Product from './product';

import { inject, observer } from 'mobx-react';

import { useInView } from 'react-intersection-observer'

import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../../css/components/productList.scss';

interface ProductListViewProps {
    onPut?: (product: ProductItem) => void;
    orderType?: string;
}

const ProductListView: React.FC<ProductListViewProps> = ({ onPut = (() => { }), orderType = '' }) => {
    const [productList, setProductList] = useState([] as ProductItem[])
    let [isLoading, setIsLoading] = useState<boolean>(false);

    const [target, inView] = useInView({
        threshold: 0.5,
    });


    useEffect(() => {
        // orderType이 변경되면 productList 초기화
        fetchAndGetProductList();
    }, [orderType]);

    const fetchAndGetProductList = async () => {
        await fetchProductList(orderType);
        initProductList();
    }

    const initProductList = () => {
        const { productListSlice, isMore } = getProductItems(0);
        setProductList(productListSlice);
        setIsLoading(isMore);
    };

    // 맨 아래 로딩 영역이 화면에 보이면 productList를 더 불러옴
    useEffect(() => {
        if (!inView) return;
        getProductList();
    }, [inView]);


    const getProductList = () => {
        const { productListSlice, isMore } = getProductItems(productList.length);
        setProductList(productList.concat(productListSlice));
        setIsLoading(isMore);
    };

    return (
        <div className='productListWrap'>
            {productList.map((productItem) => (
                <Product
                    key={productItem.id}
                    ProductItem={productItem}
                    onPut={onPut}
                />
            ))}
            <div ref={target}>
                {
                    isLoading &&
                    <Skeleton variant='rect' animation='wave' width={'100%'} height={'100%'} className='skeleton'>
                        <CircularProgress className='loadingCircle' />
                    </Skeleton>
                }
            </div>
        </div>
    )
}

export default inject(({ cart, order }) => ({
    onPut: cart.put,
    orderType: order.orderType,
}))(observer(ProductListView));
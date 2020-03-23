import React, { useState, useEffect } from 'react';

import { ProductItem } from '../../models'

import { inject, observer } from 'mobx-react';

import { useInView } from 'react-intersection-observer';

import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import '../../css/components/product.scss';

interface productProps {
    ProductItem: ProductItem;
    onPut: (product: ProductItem) => void;
    isInCart?: (productId: string) => boolean;
}

const Product: React.FC<productProps> = ({ ProductItem, onPut = (() => { }), isInCart = (() => { }) }) => {
    const [coverImage, setCoverImage] = useState('');

    const [target, inView] = useInView({
        threshold: 0.5,
    });

    // 이미지 영역에 화면에 보일 때 이미지 로드 
    useEffect(() => {
        if (inView) {
            setCoverImage(ProductItem.coverImage);
        }
    }, [inView]);

    return (
        <Grow in={true}>
            <div className='productWrap' ref={target}>
                <div className='productTop'>
                    <div className='productImage'
                        style={{ backgroundImage: `url(${coverImage})` }}>
                    </div>
                    <IconButton className='cartButton' onClick={() => onPut(ProductItem)}>
                        {
                            !isInCart(ProductItem.id)
                                ? <AddShoppingCartIcon />
                                : <RemoveShoppingCartIcon />
                        }
                    </IconButton>
                </div>
                <div className='productBottom'>
                    <div className='title' title={ProductItem.title}>
                        {ProductItem.title}
                    </div>
                    <div className='price'>
                        <div>
                            {ProductItem.price.toLocaleString()}원
                        </div>
                    </div>
                </div>
            </div>
        </Grow>
    )
}
export default inject(({ cart }) => ({
    isInCart: cart.isInCart
}))(observer(Product));

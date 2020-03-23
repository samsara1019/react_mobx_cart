
import React from 'react';
import ProductListView from '../components/productListView';
import ScrollToTop from '../components/scrollToTop';


import '../../css/pages/product.scss';

const Product: React.FC = () => {
    return (
        <div className='ProductWrap'>
            <ProductListView />
            <ScrollToTop />
        </div>

    )
}

export default Product;
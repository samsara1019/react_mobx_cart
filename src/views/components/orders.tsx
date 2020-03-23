import React from 'react';

import { inject, observer } from 'mobx-react';

import "../../css/components/orders.scss";

interface ProductsProps {
    orderType?: string;
    chagneOrderType?: (newOrderType: string) => void;
}

const Orders: React.FC<ProductsProps> = ({ orderType = '', chagneOrderType = (() => { }) }) => {
    const orderTypes = [
        { type: '', text: '해제' },
        { type: 'high', text: '가격높은순' },
        { type: 'row', text: '가격낮은순' }
    ]

    return (
        <div className='orderWrap'>
            <span>정렬</span>
            {
                orderTypes.map((order) => (
                    <button
                        key={order.type}
                        className={`orderButton ${orderType === order.type ? 'select' : ''}`}
                        onClick={() => chagneOrderType(order.type)}>
                        {order.text}
                    </button>
                ))
            }
        </div>
    )
}

export default inject(({ order }) => ({
    orderType: order.orderType,
    chagneOrderType: order.chagneOrderType
}))(observer(Orders));
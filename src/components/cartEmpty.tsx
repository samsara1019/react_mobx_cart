import * as React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import StoreIcon from '@material-ui/icons/Store';

import "../css/components/cartEmpty.scss"


const CartEmpty: React.FC = () => {
    const history = useHistory();

    return (
        <div className="cartEmptyWrap">
            <span className="emptyText">아직 장바구니에 담은 클래스가 없습니다.</span>
            <Button
                onClick={() => history.push('/')}
                variant="contained"
                endIcon={<StoreIcon />}
            >
                클래스 구경하러 가기
            </Button>
        </div>
    )
}

export default CartEmpty
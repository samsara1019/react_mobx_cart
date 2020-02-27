import * as React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import StoreIcon from '@material-ui/icons/Store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import "../css/components/cartEmpty.scss"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const CartEmpty: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const changePage = (path: string) => {
        history.push(path)
    }
    return (
        <div className="CartEmptyWrap">
            <span className="EmptyText">아직 장바구니에 담은 클래스가 없습니다.</span>
            <Button
                onClick={() => changePage('/')}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<StoreIcon />}
            >
                클래스 구경하러 가기
            </Button>
        </div>
    )
}

export default CartEmpty
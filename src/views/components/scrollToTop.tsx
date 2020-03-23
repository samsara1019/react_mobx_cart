import React from 'react';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import '../../css/components/scrollToTop.scss';

const ScrollToTop: React.FC = () => {
    const scrollToTop = (smooth: boolean = false) => {
        window.scrollTo({
            top: 0,
            behavior: smooth ? 'smooth' : 'auto',
        })
    }

    return (
        <Fab className='ScrollToTop' color='primary' size='small'
            onClick={() => scrollToTop(true)}>
            <KeyboardArrowUpIcon />
        </Fab>
    )
}

export default ScrollToTop;
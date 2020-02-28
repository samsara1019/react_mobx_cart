import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import { ToastObject } from "../models"


const Toast: React.FC = ({ toastObject }: any) => {
    useEffect(() => {
        showToast(toastObject)
    }, [toastObject]);

    const showToast = (toastObject: ToastObject) => {
        if (!toastObject.toastText) return;

        toast(toastObject.toastText, {
            type: toastObject.toastType,
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    return (
        <ToastContainer
            transition={Slide}
            position="top-center"
            hideProgressBar
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
        />
    )
}

export default inject(({ toast }) => ({
    toastObject: toast.toastObject,
}))(observer(Toast));
"use client";
import { Toaster } from 'react-hot-toast';
import React from 'react'

function ToastProvider() {
    return (
        <Toaster position='top-right'/>
    )
}

export default ToastProvider
import React, { useState, useRef } from 'react';
import Result from '../components/result';
import StoreProvider from '@/app/StoreProvider';

const Output: React.FC<{}> = () => {
    return (
        <StoreProvider>
            <Result />
        </StoreProvider>
    );
}

export default Output;
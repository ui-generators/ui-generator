import React, { useState, useRef } from 'react';
import Result from '../components/result';
import StoreProvider from '@/app/StoreProvider';
import P5Wrapper from '../components/p5Wrapper';
const Output: React.FC<{}> = () => {
    return (
        <StoreProvider>
            <Result />
            <P5Wrapper />
        </StoreProvider>
    );
}

export default Output;
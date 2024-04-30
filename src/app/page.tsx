"use client";

import React, { useState } from 'react';
import StoreProvider from './StoreProvider';
import Landing from '../pages/landing';
import P5Wrapper from '../components/p5Wrapper';

const Home: React.FC = () => {
  return (
    <StoreProvider>
      <Landing />
    </StoreProvider>
  );
};

export default Home;

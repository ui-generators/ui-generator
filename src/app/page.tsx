"use client";

import React from 'react';
import StoreProvider from './StoreProvider';
import Landing from '../pages/landing';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../lib/store';

const Home: React.FC = () => {
  return (
    <StoreProvider>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Landing />
      </PersistGate>
    </StoreProvider>
  );
};

export default Home;

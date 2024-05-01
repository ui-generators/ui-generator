"use client";

import React from "react";
import StoreProvider from "./StoreProvider";
import Landing from "../pages/landing";

const Home: React.FC = () => {
    return (
        <StoreProvider>
            <Landing />
        </StoreProvider>
    );
};

export default Home;

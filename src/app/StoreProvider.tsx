// Reference: https://redux.js.org/usage/nextjs
'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    try {
        storeRef.current = makeStore(); // Ensure `makeStore` returns a valid Redux store
    } catch (error) {
        console.error("Error initializing Redux store:", error);
    }
    if (!storeRef.current) {
        console.error("Redux store is undefined. Check `makeStore` implementation.");
        return <div>Error: Redux store not initialized</div>;
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
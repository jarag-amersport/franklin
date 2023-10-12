import { useCallback, useEffect } from "react";
import { BrowserPersistence } from '@magento/peregrine/lib/util';

const storage = new BrowserPersistence();

export const useLocalStorage = (key, defaultValue) => {
    const lastCartId = storage.getItem(key) || null;

    useEffect(() => {
        if(defaultValue) {
            storage.setItem(key, defaultValue);
        }
    },[defaultValue]);
    
    const setLastCartId = useCallback((value) => {
        storage.setItem(key, value);
    },[storage, key]);

    return [
        lastCartId, 
        setLastCartId
    ]
}
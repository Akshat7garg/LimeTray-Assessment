import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initalValue) => {
    const [value, setValue] = useState(() => {
        try {
            const storedData = localStorage.getItem(key);
            return (storedData) ? JSON.parse(storedData) : initalValue;
        }
        catch (err) {
            console.error(`Error is reading localStorage key "${key}"`, err);
            return initalValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (err) {
            console.error(`Error in setting localStorage key "${key}"`, err);
        }
    }, [key, value]);

    return [value, setValue];
}

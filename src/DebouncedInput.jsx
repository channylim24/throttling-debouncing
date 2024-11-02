import React, { useState, useEffect, useRef } from 'react';

const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    const debouncedFunction = (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return debouncedFunction;
};

const fetchData = async (query) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`);
    const data = await response.json();
    console.log('API Data:', data);
};

const DebouncedInput = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const debouncedFetch = useDebounce((value) => {
        if (value) fetchData(value);
    }, 2000);

    const handleInputChange = (event) => {
        handleChange(event);
        debouncedFetch(event.target.value);
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type to search (debounced)..."
        />
    );
};

export const NonDebouncedInput = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value) {
            await fetchData(value);
        }
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type to search (non-debounced)..."
        />
    );
};

export default DebouncedInput;

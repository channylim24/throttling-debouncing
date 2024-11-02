import React, { useEffect } from 'react';

const useThrottle = (callback, delay) => {
    let lastTime = 0;

    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            callback(...args);
        }
    };
};

const ThrottledComponent = () => {
    const handleScroll = useThrottle(() => {
        console.log(new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString(), 'Scrolled!');
    }, 2000);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return <div style={{ height: '500vh' }}>(With Throttling) Scroll to see throttling in action!</div>;
};

export const NonThrottledComponent = () => {
    const handleScroll = () => {
        console.log(new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString(), 'Scrolled!');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <div style={{ height: '500vh' }}>(Without Throttling) Scroll to see events firing!</div>;
};

export default ThrottledComponent;

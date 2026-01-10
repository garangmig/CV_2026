import { useState, useEffect } from 'react';

export const useMouseCoordinates = (amplitud = 5.0) => {
    const [coords, setCoords] = useState("34.0522° N, 118.2437° W");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const lat = (34.0522 + (e.clientY / window.innerHeight - 0.5) * amplitud).toFixed(4);
            const lng = (118.2437 + (e.clientX / window.innerWidth - 0.5) * amplitud).toFixed(4);

            setCoords(`${lat}° N, ${lng}° W`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [amplitud]);

    return coords;
};

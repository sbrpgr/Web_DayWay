import React, { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('li') ||
                target.closest('[role="button"]');

            setIsPointer(isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div
                className={`${styles.cursor} ${isPointer ? styles.pointer : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <div
                className={`${styles.follower} ${isPointer ? styles.pointer : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
        </>
    );
};

export default CustomCursor;

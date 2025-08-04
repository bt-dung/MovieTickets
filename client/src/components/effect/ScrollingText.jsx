import React, { useRef, useEffect, useState } from 'react';

const ScrollingText = ({ text = "Unknown Theater" }) => {
    const textRef = useRef(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    useEffect(() => {
        if (textRef.current.scrollWidth > 150) {
            setShouldScroll(true);
        }
    }, [text]);

    return (
        <a
            href="#0"
            className="name"
            style={{
                display: 'inline-block',
                maxWidth: '150px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                verticalAlign: 'middle'
            }}
        >
            <span
                ref={textRef}
                style={{
                    display: 'inline-block',
                    animation: shouldScroll ? 'scrollText 10s infinite' : 'none',
                    paddingRight: shouldScroll ? '100%' : '0'
                }}
            >
                {text}
            </span>
        </a>
    );
};

export default ScrollingText;

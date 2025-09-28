'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface AnimatedHeaderProps {
    text: string;
    as?: HeaderTag;
    className?: string;
    once?: boolean;
    delay?: number;
}

export function AnimatedHeader({
    text,
    as: Tag = 'h1',
    className = '',
    once = true,
    delay = 0,
}: AnimatedHeaderProps) {
    const containerRef = useRef<HTMLHeadingElement | null>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!containerRef.current) return;
        if (once && hasAnimated.current) return;

        const split = new SplitText(containerRef.current, { type: 'chars' });

        const ctx = gsap.context(() => {
            gsap.from(split.chars, {
                x: 50,
                rotationY: -90,
                duration: 1,
                ease: 'back.out(1.7)',
                stagger: 0.01,
                delay,
            });
        }, containerRef);

        hasAnimated.current = true;

        return () => {
            ctx.revert(); // clean up GSAP and DOM splits
        };
    }, [once, delay]);

    return (
        <Tag ref={containerRef} className={className}>
            {text}
        </Tag>
    );
}

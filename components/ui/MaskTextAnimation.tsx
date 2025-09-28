// MaskText.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { JSX, useMemo, useRef } from 'react';

type SplitMode = 'words' | 'chars' | 'lines';

interface MaskTextProps {
    text: string;
    split?: SplitMode; // 'words' | 'chars' | 'lines'
    tag?: keyof JSX.IntrinsicElements; // semantic tag to render (p, h1, div, etc.)
    className?: string;
    duration?: number; // animation duration for each item
    stagger?: number; // gap between children animations
    once?: boolean; // whether to run animation only once
    from?: 'bottom' | 'top' | 'left' | 'right'; // direction of the reveal
}

/**
 * MaskText
 * - text: the sentence (can include newlines \n)
 * - split: 'words' (default) | 'chars' | 'lines' (lines uses '\n')
 * - tag: semantic tag like 'p', 'h1' (defaults to 'p')
 */
export function MaskText({
    text,
    split = 'words',
    tag = 'p',
    className,
    duration = 0.6,
    stagger = 0.06,
    once = true,
    from = 'bottom',
}: MaskTextProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(rootRef, { once, margin: '0px 0px -10% 0px' });

    // ✅ Hooks must run unconditionally (moved before any return)
    const tokens = useMemo(() => {
        if (!text) return [];
        if (split === 'chars') {
            return Array.from(text);
        }
        if (split === 'words') {
            return text.split(/(\s+)/).filter(Boolean);
        }
        return [];
    }, [text, split]);

    if (!text) return null; // ✅ Safe early return AFTER hooks

    const childVariants = {
        hidden: {
            y: from === 'bottom' ? '100%' : from === 'top' ? '-100%' : 0,
            x: from === 'left' ? '-0.25em' : from === 'right' ? '0.25em' : 0,
            opacity: 0,
        },
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: { duration },
        },
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
    };

    const MotionTag =
        (motion as unknown as Record<string, typeof motion.div>)[tag] ?? motion.div;

    const renderToken = (tok: string, idx: number) => {
        const isSpace = /^\s+$/.test(tok);
        if (isSpace) {
            return (
                <span key={`sp-${idx}`} aria-hidden style={{ whiteSpace: 'pre-wrap' }}>
                    {tok}
                </span>
            );
        }
        return (
            <span key={`tk-${idx}`} className="inline-block overflow-hidden">
                <motion.span variants={childVariants} style={{ display: 'inline-block' }}>
                    {tok}
                </motion.span>
            </span>
        );
    };

    if (split === 'lines') {
        const lines = text.split(/\r?\n/)
        return (
            <div ref={rootRef}>
                <MotionTag
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className={className}
                >
                    {lines.map((line, li) => {
                        const parts = line.split(/(\s+)/).filter(Boolean);
                        return (
                            <motion.div
                                key={`line-${li}`}
                                variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
                                className="overflow-hidden block"
                            >
                                {parts.map((p, i) => renderToken(p, li * 1000 + i))}
                            </motion.div>
                        );
                    })}
                </MotionTag>
            </div>
        );
    }

    return (
        <div ref={rootRef}>
            <MotionTag
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={containerVariants}
                className={className}
            >
                {tokens.map((t, i) => renderToken(t, i))}
            </MotionTag>
        </div>
    );
}

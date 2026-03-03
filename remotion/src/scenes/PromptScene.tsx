import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { tokens } from '../styles';

export const PromptScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const text = 'npx vibeforge init';

    // Typewriter effect
    const charsToShow = Math.floor(interpolate(frame, [0, fps * 2], [0, text.length], {
        extrapolateRight: 'clamp',
    }));

    const textToShow = text.slice(0, charsToShow);

    // Cursor blink
    const cursorOpacity = Math.floor(frame / (fps / 2)) % 2 === 0 ? 1 : 0;

    return (
        <AbsoluteFill style={{
            backgroundColor: tokens.colors.base,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: tokens.typography.code,
        }}>
            <div style={{
                fontSize: '80px',
                color: tokens.colors.accentAlt,
                backgroundColor: tokens.colors.surface,
                padding: '40px 80px',
                borderRadius: '24px',
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: `0 0 60px ${tokens.colors.glow}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <span style={{ color: tokens.colors.accentWarm }}>$</span>
                <span>{textToShow}</span>
                <span style={{
                    opacity: cursorOpacity,
                    width: '40px',
                    height: '80px',
                    backgroundColor: tokens.colors.text.primary,
                    display: 'inline-block'
                }} />
            </div>
        </AbsoluteFill>
    );
};

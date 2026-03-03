import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { tokens } from '../styles';

// Generate some random-looking lengths for abstract code blocks
const generateSyntax = (count: number, seed: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        width: 10 + (Math.sin(seed * (i + 1)) * 30 + 30) + '%',
        color: [tokens.colors.accent, tokens.colors.accentAlt, tokens.colors.accentWarm, tokens.colors.text.primary][(i + seed) % 4]
    }));
};

export const CodeGeneratedScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{
            backgroundColor: tokens.colors.base,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: tokens.typography.code
        }}>
            <div style={{
                position: 'relative',
                width: '80%',
                height: '70%',
                backgroundColor: tokens.colors.surface,
                borderRadius: '24px',
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: `0 20px 80px rgba(0,0,0,0.5)`,
                padding: '60px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                overflow: 'hidden'
            }}>
                {/* Title Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    position: 'absolute',
                    top: '20px',
                    left: '20px'
                }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#eab308' }} />
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </div>

                {/* Abstract Code */}
                {Array.from({ length: 8 }).map((_, lineIdx) => {
                    // Staggering the appearance of lines
                    const delay = lineIdx * 10;
                    const blockScale = spring({
                        fps,
                        frame: frame - delay,
                        config: { damping: 14 }
                    });

                    const opacity = frame >= delay ? 1 : 0;

                    const codeChunks = generateSyntax(lineIdx % 3 + 2, lineIdx);

                    return (
                        <div key={lineIdx} style={{
                            display: 'flex',
                            gap: '16px',
                            opacity,
                            transform: `scaleY(${blockScale})`,
                            transformOrigin: 'top'
                        }}>
                            {/* Line Number */}
                            <div style={{ color: tokens.colors.text.muted, width: '40px' }}>
                                {(lineIdx + 1).toString().padStart(2, '0')}
                            </div>

                            {/* Syntax Blocks */}
                            <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                                {codeChunks.map((chunk, cIdx) => (
                                    <div key={cIdx} style={{
                                        height: '24px',
                                        width: chunk.width,
                                        backgroundColor: chunk.color,
                                        borderRadius: '6px',
                                        opacity: 0.8
                                    }} />
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Status Float */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '40px',
                    backgroundColor: tokens.colors.elevated,
                    padding: '16px 32px',
                    borderRadius: '16px',
                    border: `1px solid ${tokens.colors.border}`,
                    color: tokens.colors.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transform: `translateX(${spring({ fps, frame: frame - 60, config: { damping: 12 } }) * 0 + (frame > 60 ? 0 : 200)}px)`,
                    opacity: frame > 60 ? 1 : 0
                }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: tokens.colors.accentAlt, boxShadow: `0 0 10px ${tokens.colors.accentAlt}` }} />
                    Generating Components...
                </div>
            </div>
        </AbsoluteFill>
    );
};

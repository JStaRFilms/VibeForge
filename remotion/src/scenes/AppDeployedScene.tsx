import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { tokens } from '../styles';

export const AppDeployedScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideUp = spring({
        fps,
        frame,
        config: { damping: 16, mass: 1.2 }
    });

    return (
        <AbsoluteFill style={{
            backgroundColor: tokens.colors.base,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: tokens.typography.body
        }}>

            <h1 style={{
                position: 'absolute',
                top: '10%',
                fontSize: '80px',
                fontFamily: tokens.typography.display,
                color: tokens.colors.text.primary,
                opacity: frame > 30 ? 1 : 0,
                transform: `translateY(${spring({ fps, frame: frame - 30 }) * 0 + (frame > 30 ? 0 : 20)}px)`,
                transition: 'opacity 0.5s'
            }}>
                Ready to Ship.
            </h1>

            {/* Browser Mockup */}
            <div style={{
                width: '1200px',
                height: '700px',
                backgroundColor: tokens.colors.surface,
                borderRadius: '24px',
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 60px ${tokens.colors.glow}`,
                transform: `translateY(${100 - (slideUp * 100)}vh) scale(${0.8 + (slideUp * 0.2)})`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'absolute',
                bottom: '-5%'
            }}>
                {/* Browser Chrome */}
                <div style={{
                    height: '60px',
                    borderBottom: `1px solid ${tokens.colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    gap: '16px',
                    backgroundColor: tokens.colors.elevated
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#eab308' }} />
                        <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                    </div>
                    <div style={{
                        flex: 1,
                        height: '36px',
                        backgroundColor: tokens.colors.base,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: tokens.colors.text.muted,
                        fontSize: '14px',
                        border: `1px solid ${tokens.colors.border}`
                    }}>
                        localhost:3000
                    </div>
                </div>

                {/* App Content */}
                <div style={{
                    flex: 1,
                    padding: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                    position: 'relative'
                }}>
                    {/* Hero Area */}
                    <div style={{ width: '60%', height: '80px', backgroundColor: tokens.colors.text.primary, borderRadius: '16px', opacity: 0.9 }} />
                    <div style={{ width: '40%', height: '30px', backgroundColor: tokens.colors.text.muted, borderRadius: '8px', opacity: 0.5 }} />

                    {/* Grid Area */}
                    <div style={{ display: 'flex', gap: '24px', marginTop: '40px' }}>
                        <div style={{ flex: 1, height: '200px', backgroundColor: tokens.colors.elevated, borderRadius: '24px', border: `1px solid ${tokens.colors.border}` }} />
                        <div style={{ flex: 1, height: '200px', backgroundColor: tokens.colors.elevated, borderRadius: '24px', border: `1px solid ${tokens.colors.border}` }} />
                        <div style={{ flex: 1, height: '200px', backgroundColor: tokens.colors.elevated, borderRadius: '24px', border: `1px solid ${tokens.colors.border}` }} />
                    </div>

                    {/* Accent glow in app */}
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '400px',
                        height: '400px',
                        background: `radial-gradient(circle, ${tokens.colors.accent}40 0%, transparent 70%)`,
                        filter: 'blur(60px)',
                        pointerEvents: 'none'
                    }} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

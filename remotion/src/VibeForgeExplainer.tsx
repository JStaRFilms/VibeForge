import React from 'react';
import { AbsoluteFill } from 'remotion';
import { tokens } from './styles';

export const VibeForgeExplainer: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: tokens.colors.base, color: tokens.colors.text.primary, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: '100px', fontFamily: tokens.typography.heading }}>VibeForge</h1>
        </AbsoluteFill>
    );
};

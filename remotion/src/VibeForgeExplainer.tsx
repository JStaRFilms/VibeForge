import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { tokens } from './styles';
import { PromptScene } from './scenes/PromptScene';
import { SkillsActivateScene } from './scenes/SkillsActivateScene';
import { CodeGeneratedScene } from './scenes/CodeGeneratedScene';
import { AppDeployedScene } from './scenes/AppDeployedScene';


export const VibeForgeExplainer: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: tokens.colors.base }}>
            <Sequence from={0} durationInFrames={90}>
                <PromptScene />
            </Sequence>
            <Sequence from={90} durationInFrames={120}>
                <SkillsActivateScene />
            </Sequence>
            <Sequence from={210} durationInFrames={120}>
                <CodeGeneratedScene />
            </Sequence>
            <Sequence from={330} durationInFrames={120}>
                <AppDeployedScene />
            </Sequence>
        </AbsoluteFill>
    );
};

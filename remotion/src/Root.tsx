import React from 'react';
import { Composition } from 'remotion';
import { VibeForgeExplainer } from './VibeForgeExplainer';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="VibeForgeExplainer"
                component={VibeForgeExplainer}
                durationInFrames={450}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};

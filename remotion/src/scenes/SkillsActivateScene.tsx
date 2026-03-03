import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { tokens } from '../styles';

const skills = [
    { name: 'UI/UX Design', color: tokens.colors.accent },
    { name: 'Frontend', color: tokens.colors.accentAlt },
    { name: 'Backend', color: tokens.colors.accentWarm },
    { name: 'Deployment', color: tokens.colors.text.primary }
];

export const SkillsActivateScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{
            backgroundColor: tokens.colors.base,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: tokens.typography.heading
        }}>
            <h2 style={{
                position: 'absolute',
                top: '20%',
                fontSize: '60px',
                color: tokens.colors.text.primary,
                opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
            }}>
                Activating AI Agents...
            </h2>

            <div style={{ display: 'flex', gap: '40px' }}>
                {skills.map((skill, index) => {
                    const delay = index * 10;
                    const scale = spring({
                        fps,
                        frame: frame - delay,
                        config: { damping: 12 },
                    });

                    const rotate = interpolate(
                        frame - delay,
                        [0, 30],
                        [(index - 1.5) * 45, 0], // Fan out from center, then align
                        { extrapolateRight: 'clamp' }
                    );

                    const enterY = interpolate(frame - delay, [0, 20], [200, 0], { extrapolateRight: 'clamp' });
                    const opacity = interpolate(frame - delay, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

                    return (
                        <div key={skill.name} style={{
                            width: '250px',
                            height: '350px',
                            backgroundColor: tokens.colors.surface,
                            borderRadius: '24px',
                            border: `2px solid ${skill.color}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity,
                            transform: `scale(${scale}) translateY(${enterY}px) rotate(${rotate}deg)`,
                            boxShadow: `0 0 40px ${skill.color}40`, // 40 is hex for 25% opacity
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Abstract grid pattern */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `radial-gradient(circle at 2px 2px, ${skill.color} 1px, transparent 0)`,
                                backgroundSize: '24px 24px',
                                opacity: 0.1
                            }} />
                            <span style={{
                                color: tokens.colors.text.primary,
                                fontSize: '32px',
                                zIndex: 1
                            }}>
                                {skill.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

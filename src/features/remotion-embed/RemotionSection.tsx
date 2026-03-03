'use client';

import React from 'react';
import { Player } from '@remotion/player';
import { VibeForgeExplainer } from '../../../remotion/src/VibeForgeExplainer';

export default function RemotionSection() {
    return (
        <section className="relative w-full py-24 flex items-center justify-center bg-black/50 overflow-hidden">
            {/* Decorative background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">

                    <div className="flex flex-col justify-center space-y-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif">
                            Execute the <span className="text-primary italic">VibeCode Protocol</span>
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Observe our specialized AI agents as they transition seamlessly from concept to deployed application. The VibeForge core orchestrator breaks down tasks, spins up workers, and ships production builds.
                        </p>
                    </div>

                    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                        {/* Glowing glassmorphism container */}
                        <div className="relative aspect-video rounded-xl border border-primary/20 bg-background/50 p-2 backdrop-blur-xl shadow-[0_0_40px_rgba(230,57,70,0.15)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

                            <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/5 bg-black">
                                <Player
                                    component={VibeForgeExplainer}
                                    durationInFrames={450} // 15 seconds at 30fps = 450 frames
                                    compositionWidth={1920}
                                    compositionHeight={1080}
                                    fps={30}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    controls={false}
                                    autoPlay
                                    loop
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

"use client";

import React from "react";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-[1px]">
            <div className="relative">
                {/* Subtle background orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-60 animate-pulse" />
                </div>

                {/* Logo with elegant typography */}
                <div className="relative z-10 transform transition-all duration-300 hover:scale-105">
                    <h1 className="text-4xl font-light tracking-[0.3em] text-gray-900 relative">
                        ROWAY
                        <div className="absolute -bottom-2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent transform -translate-x-1/2" />
                    </h1>
                </div>

                {/* Sophisticated loading dots */}
                <div className="flex justify-center mt-8 space-x-2">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className="w-1.5 h-1.5 bg-gray-600 rounded-full opacity-70"
                            style={{
                                animation: `elegantBounce 1.4s ease-in-out infinite ${index * 0.16}s`
                            }}
                        />
                    ))}
                </div>

                {/* Minimal progress indicator */}
                <div className="mt-6 w-24 h-0.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gray-700 rounded-full transition-all duration-1000"
                        style={{
                            animation: "shimmer 2.2s ease-in-out infinite"
                        }}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes elegantBounce {
                    0%, 80%, 100% {
                        transform: translateY(0);
                        opacity: 0.7;
                    }
                    40% {
                        transform: translateY(-6px);
                        opacity: 1;
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                        width: 0%;
                    }
                    50% {
                        transform: translateX(0%);
                        width: 100%;
                    }
                    100% {
                        transform: translateX(100%);
                        width: 0%;
                    }
                }
            `}</style>
        </div>
    );
};

export default PageLoader;
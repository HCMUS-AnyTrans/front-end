'use client';

import React from 'react';

export function AuthBackground() {
  return (
    <>
      {/* Animated background orbs */}
      <div
        className="absolute top-0 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl bg-gradient-to-r from-blue-400 to-indigo-500"
        style={{
          animation: 'float-slow 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl bg-gradient-to-r from-purple-400 to-pink-500"
        style={{
          animation: 'float-slow 25s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl bg-gradient-to-r from-indigo-400 to-blue-500"
        style={{
          animation: 'float-slow 30s ease-in-out infinite',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }
      `}</style>
    </>
  );
}

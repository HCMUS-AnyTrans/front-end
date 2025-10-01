import React from 'react';

export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Hero section decorations */}
      {/* <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"></div> */}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* Additional floating elements */}
      <div className="absolute top-1/4 left-1/4 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] bg-gradient-to-br from-blue-50/40 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-3/4 right-1/4 w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] bg-gradient-to-br from-purple-50/40 to-transparent rounded-full blur-2xl"></div>
    </div>
  );
}

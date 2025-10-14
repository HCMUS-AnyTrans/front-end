import React from 'react';

export default function FooterLogo() {
  return (
    <div className="flex flex-col gap-4">
      <a
        href="/"
        className="group inline-flex items-center gap-3 w-fit transition-all duration-300 hover:shadow-2xl hover:scale-102"
        aria-label="AnyTrans - Go to homepage"
      >
        {/* Logo Icon */}
        <div className="relative flex-shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#4169E1] to-[#1e3a8a] rounded-xl shadow-lg group-hover:rotate-45 transition-all duration-300">
            <img src="./Logo.svg" alt="" className="w-7 h-7 group-hover:-rotate-45 transition-all duration-300" />
          </div>
        </div>

        {/* Logo Text */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white tracking-tight">
            anytrans
          </span>
          <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
            Translation Services
          </span>
        </div>
      </a>

      <p className="text-gray-400 text-sm leading-relaxed max-w-md">
        Professional translation services for documents, subtitles, and more.
        Empowering global communication with cutting-edge technology.
      </p>
    </div>
  );
}

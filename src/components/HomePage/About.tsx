'use client';

import React, { useState } from 'react';
import { FileText, Video, BookOpen, Users } from 'lucide-react';

interface FloatingCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  bgColor: string;
  delay: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

function FloatingCard({
  icon,
  category,
  title,
  bgColor,
  delay,
  isHovered,
  onHover,
}: FloatingCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:scale-105`}
      style={{
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${bgColor}`}
      >
        <div className="text-white">{icon}</div>
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div
          className={`text-sm font-medium transition-colors duration-500 text-gray-500`}
        >
          {category}
        </div>
        <div
          className={`font-bold text-[15px] leading-tight transition-colors duration-500 ${
            isHovered ? 'text-[#142457]' : 'text-[#142457]'
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="w-full py-20 overflow-hidden relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F7FF] to-[#DDEBFF]" />

      {/* Large circle decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#E3F2FF]/40 to-[#C5E3FF]/60 blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col gap-8 text-center lg:text-left w-full lg:max-w-xl">
            <h2
              className="font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0F172A]"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              Everything You
              <br />
              <span className="text-[#173fb6] inline-block transition-all duration-1000 ease-out">
                Need to Translate Better
              </span>
            </h2>

            <p
              className="text-lg leading-relaxed text-gray-600"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              Our platform empowers you to translate documents, subtitles, and
              videos effortlessly. Upload DOCX, PDF, or PPTX files and get
              instant Vietnamese translations without losing formatting.
              Translate SRT, VTT, or MP4 content with perfectly synchronized
              timing, and manage your own terminology glossary to keep every
              translation accurate and consistent.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] cursor-pointer text-white hover:from-[#1e3a8a] hover:to-[#4169E1] font-semibold text-base h-[52px] w-[160px] rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105">
                Read More
              </button>
            </div>
          </div>

          {/* Right floating cards section */}
          <div className="relative w-full lg:w-auto flex items-center justify-center">
            <div className="relative w-full max-w-md lg:w-[450px] h-[500px]">
              {/* Decorative circle behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#B8DBFF]/30 to-[#E8F4FF]/50 blur-2xl" />

              {/* Card 1 - Top */}
              <div
                className="absolute top-8 right-0 w-[320px] animate-float"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '0s',
                }}
              >
                <FloatingCard
                  icon={<Users size={28} strokeWidth={2} />}
                  category="Translation"
                  title="Document Translation & Management"
                  bgColor="bg-[#80eac2]"
                  delay={0}
                  isHovered={hoveredCard === 'document'}
                  onHover={(hovered) =>
                    setHoveredCard(hovered ? 'document' : null)
                  }
                />
              </div>

              {/* Card 2 - Middle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-8 w-[320px] animate-float z-10"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '2s',
                }}
              >
                <FloatingCard
                  icon={<Users size={28} strokeWidth={2} />}
                  category="Media"
                  title="Subtitle & Video Translation"
                  bgColor="bg-[#7d87ff]"
                  delay={200}
                  isHovered={hoveredCard === 'subtitle'}
                  onHover={(hovered) =>
                    setHoveredCard(hovered ? 'subtitle' : null)
                  }
                />
              </div>

              {/* Card 3 - Bottom */}
              <div
                className="absolute bottom-8 right-4 w-[300px] animate-float"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '4s',
                }}
              >
                <FloatingCard
                  icon={<Users size={28} strokeWidth={2} />}
                  category="Productivity"
                  title="Glossary & Consistency Tools"
                  bgColor="bg-[#f3aa01]"
                  delay={400}
                  isHovered={hoveredCard === 'glossary'}
                  onHover={(hovered) =>
                    setHoveredCard(hovered ? 'glossary' : null)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

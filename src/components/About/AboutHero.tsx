import { Sparkles } from 'lucide-react';
import { AboutHeroProps } from '@/src/types/about';

export default function AboutHero({ stats }: AboutHeroProps) {
  return (
    <div className="bg-gradient-to-br from-[#4169E1] via-[#1e3a8a] to-[#4169E1] text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">About AnyTrans</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Breaking Language Barriers,
          <br />
          One Translation at a Time
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-8">
          We're on a mission to make professional translation accessible to
          everyone, empowering global communication through innovative AI
          technology.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mt-8 sm:mt-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20"
            >
              <p className="text-2xl sm:text-3xl font-bold mb-1">
                {stat.number}
              </p>
              <p className="text-xs sm:text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

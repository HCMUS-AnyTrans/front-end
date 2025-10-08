import { Target, Globe } from 'lucide-react';
import { AboutStoryProps } from '@/src/types/about';

export default function AboutStory({ mission, vision }: AboutStoryProps) {
  const MissionIcon = mission.icon;
  const VisionIcon = vision.icon;

  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Story</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From a small team with a big vision to a global platform trusted by
          thousands
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <MissionIcon className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {mission.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{mission.description}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
            <VisionIcon className="w-7 h-7 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {vision.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{vision.description}</p>
        </div>
      </div>
    </section>
  );
}

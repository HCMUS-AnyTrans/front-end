import { Calendar } from 'lucide-react';
import { AboutTimelineProps } from '@/src/types/about';

export default function AboutTimeline({ milestones }: AboutTimelineProps) {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Journey</h2>
        <p className="text-lg text-gray-600">
          Key milestones in our growth story
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 transform -translate-x-1/2"></div>

        <div className="space-y-8">
          {milestones.map((milestone, idx) => (
            <div
              key={milestone.year}
              className={`flex items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              <div
                className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all inline-block w-full lg:w-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-gray-50"></div>
              </div>

              <div className="flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

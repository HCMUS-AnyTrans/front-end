import { BaseCard } from '@/src/components/Common';
import { AboutValuesProps } from '@/src/types/about';

export default function AboutValues({ values }: AboutValuesProps) {
  return (
    <section>
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          Core Values
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          The principles that guide everything we do
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <BaseCard
              key={value.title}
              variant="value"
              icon={<Icon className="w-6 h-6" />}
              title={value.title}
              description={value.description}
              color={value.color}
            />
          );
        })}
      </div>
    </section>
  );
}

import { BaseFAQ } from '@/src/components/Common';
import { PricingFAQProps } from '@/src/types/pricing';

export default function PricingFAQ({
  faqs,
  openIndex,
  onToggle,
}: PricingFAQProps) {
  return (
    <section className="mt-16 sm:mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Everything you need to know about our pricing
        </p>
      </div>

      <BaseFAQ
        variant="accordion"
        faqs={faqs}
        openIndex={openIndex}
        onToggle={onToggle}
        className="max-w-3xl mx-auto"
      />
    </section>
  );
}

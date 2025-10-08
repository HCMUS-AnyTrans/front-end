import { PricingTabsProps } from '@/src/types/pricing';

export default function PricingTabs({
  activeTab,
  onTabChange,
}: PricingTabsProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
        <button
          onClick={() => onTabChange('personal')}
          className={`px-4 sm:px-8 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${activeTab === 'personal' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Personal
        </button>
        <button
          onClick={() => onTabChange('enterprise')}
          className={`px-4 sm:px-8 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${activeTab === 'enterprise' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Enterprise
        </button>
      </div>
    </div>
  );
}

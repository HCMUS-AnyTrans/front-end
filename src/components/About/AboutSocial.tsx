import { AboutSocialProps } from '@/src/types/about';

export default function AboutSocial({ socialLinks }: AboutSocialProps) {
  return (
    <section>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Connect With Us
          </h3>
          <p className="text-gray-600">
            Follow us on social media for updates and tips
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                className="flex items-center gap-3 bg-gray-50 hover:bg-[#4169E1]/10 border border-gray-200 hover:border-[#4169E1]/30 px-6 py-3 rounded-xl font-medium text-gray-700 hover:text-[#4169E1] transition-all"
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

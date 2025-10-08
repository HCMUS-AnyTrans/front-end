import { ContactSocialProps } from '@/src/types/contact';

export default function ContactSocial({ socialLinks }: ContactSocialProps) {
  return (
    <section>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Connect With Us
          </h3>
          <p className="text-gray-600">
            Follow us on social media for updates and translation tips
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <button
                key={social.name}
                className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 px-6 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 transition-all"
              >
                <Icon className={`w-5 h-5 ${social.color}`} />
                {social.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { MessageSquare } from 'lucide-react';

export default function ContactHero() {
  return (
    <div className="bg-gradient-to-r from-[#4169E1] via-[#1e3a8a] to-[#4169E1] text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          We'd Love to Hear From You
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
          Have questions about our translation services? Our team is here to
          help you succeed.
        </p>
      </div>
    </div>
  );
}

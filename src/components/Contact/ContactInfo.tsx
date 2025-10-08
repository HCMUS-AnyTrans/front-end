import { MapPin, Clock } from 'lucide-react';
import { ContactInfoProps } from '@/src/types/contact';

export default function ContactInfo({ offices, reasons }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      {/* Office Locations */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Office Locations
            </h3>
            <p className="text-sm text-gray-600">
              Visit us at our offices worldwide
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100"
            >
              <h4 className="font-bold text-gray-900 mb-1">
                {office.city}, {office.country}
              </h4>
              <p className="text-sm text-gray-600">{office.address}</p>
              <p className="text-sm text-gray-600">{office.zipcode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Working Hours</h3>
            <p className="text-sm text-gray-600">When you can reach us</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-semibold text-gray-900">
              9:00 AM - 6:00 PM
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Saturday</span>
            <span className="font-semibold text-gray-900">
              10:00 AM - 4:00 PM
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Sunday</span>
            <span className="font-semibold text-gray-900">Closed</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-900">
            <strong>24/7 Support:</strong> Live chat available anytime
          </p>
        </div>
      </div>

      {/* Why Contact Us */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
        <div className="space-y-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{reason.title}</h4>
                  <p className="text-sm text-blue-100">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  info: string;
  href?: string;
}

type ContactInfoCardProps = ContactInfoItem;

function ContactInfoCard({ icon, title, info, href }: ContactInfoCardProps) {
  const content = (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-gray-200 hover:border-[#19398f]/30">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="w-12 h-12 bg-[#19398f]/10 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="text-[#19398f]">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-[#142457] font-inter mb-1">
            {title}
          </h3>
          <p className="text-[#717680] font-nunito">
            {info}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <a href={href} className="block cursor-pointer">
        {content}
      </a>
    );
  }

  return content;
}

interface BusinessHoursProps {
  title?: string;
  hours?: Array<{
    day: string;
    time: string;
  }>;
  timezone?: string;
}

function BusinessHours({ 
  title = "Business Hours",
  hours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" }
  ],
  timezone = "All times are in Vietnam Standard Time (GMT+7)"
}: BusinessHoursProps) {
  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <h3 className="font-semibold text-[#142457] font-inter mb-4">
          {title}
        </h3>
        <div className="space-y-2 text-[#717680] font-nunito">
          {hours.map((schedule, index) => (
            <div key={index} className="flex justify-between">
              <span>{schedule.day}</span>
              <span>{schedule.time}</span>
            </div>
          ))}
          {timezone && (
            <div className="text-sm text-[#717680] mt-3 pt-3 border-t border-gray-200">
              * {timezone}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ContactInfoProps {
  title?: string;
  contactItems?: ContactInfoItem[];
  showBusinessHours?: boolean;
  businessHoursProps?: BusinessHoursProps;
}

const DEFAULT_CONTACT_ITEMS: ContactInfoItem[] = [
  {
    icon: <Mail size={24} />,
    title: "Email Us",
    info: "support@anytrans.com",
    href: "mailto:support@anytrans.com"
  },
  {
    icon: <Phone size={24} />,
    title: "Call Us",
    info: "+84 123 456 789",
    href: "tel:+84123456789"
  },
  {
    icon: <MapPin size={24} />,
    title: "Visit Us",
    info: "123 Main Street, HCMC, Vietnam"
  }
];

export default function ContactInfo({ 
  title = "Contact Information",
  contactItems = DEFAULT_CONTACT_ITEMS,
  showBusinessHours = true,
  businessHoursProps
}: ContactInfoProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#142457] font-inter mb-6">
          {title}
        </h2>
        <div className="space-y-4">
          {contactItems.map((contact, index) => (
            <ContactInfoCard key={index} {...contact} />
          ))}
        </div>
      </div>

      {showBusinessHours && (
        <BusinessHours {...businessHoursProps} />
      )}
    </div>
  );
}

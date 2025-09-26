import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

interface SocialRowProps {
  title?: string;
  subtitle?: string;
  socialLinks?: SocialLink[];
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    icon: <Facebook size={20} />,
    url: "https://facebook.com/anytrans",
    color: "hover:text-blue-600"
  },
  {
    name: "Instagram", 
    icon: <Instagram size={20} />,
    url: "https://instagram.com/anytrans",
    color: "hover:text-pink-600"
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} />,
    url: "https://twitter.com/anytrans", 
    color: "hover:text-blue-400"
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} />,
    url: "https://linkedin.com/company/anytrans",
    color: "hover:text-blue-700"
  }
];

export default function SocialRow({ 
  title = "Connect With Us",
  subtitle = "Follow us on social media for updates, tips, and translation insights",
  socialLinks = DEFAULT_SOCIAL_LINKS 
}: SocialRowProps) {
  return (
    <section className="mb-16">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#142457] font-inter mb-8">
          {title}
        </h2>
        <p className="text-lg text-[#717680] font-nunito mb-8">
          {subtitle}
        </p>
        
        <div className="flex justify-center gap-4">
          {socialLinks.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className={`w-16 h-16 rounded-full border-gray-300 hover:border-[#19398f] ${social.color} transition-colors cursor-pointer`}
              asChild
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

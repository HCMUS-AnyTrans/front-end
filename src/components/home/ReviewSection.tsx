"use client";

import React from "react";
import { Star, FileText, Video, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  review: string;
  metadata: string;
  icon: React.ReactNode;
}

function ReviewCard({ name, role, company, avatar, rating, review, metadata, icon }: ReviewCardProps) {
  return (
    <Card className="h-full flex flex-col bg-white border border-gray-200 hover:border-[#19398f]/20 hover:shadow-lg transition-all duration-200">
      <CardHeader className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-[#19398f] text-white font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-[#142457] font-nunito truncate">
                {name}
              </h4>
              <div className="flex-shrink-0 w-5 h-5 text-[#19398f]">
                {icon}
              </div>
            </div>
            <p className="text-sm text-[#717680] font-nunito">
              {role} at {company}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-[#717680] font-nunito">
            {rating}/5
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-[#414651] font-nunito leading-relaxed">
          &quot;{review}&quot;
        </p>
      </CardContent>
      
      <CardFooter>
        <p className="text-sm text-[#717680] font-nunito">
          {metadata}
        </p>
      </CardFooter>
    </Card>
  );
}

export default function ReviewSection() {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      rating: 5,
      review: "AnyTrans has revolutionized how we handle multilingual content. The document translation feature maintains perfect formatting, and the quality is outstanding.",
      metadata: "Translated 50+ marketing documents",
      icon: <FileText size={16} />
    },
    {
      name: "Miguel Rodriguez",
      role: "Content Creator",
      company: "MediaFlow",
      rating: 5,
      review: "The subtitle translation feature is a game-changer. Perfect timing synchronization and the interface is incredibly intuitive. Highly recommended!",
      metadata: "Processed 30+ video projects",
      icon: <Video size={16} />
    },
    {
      name: "Aisha Patel",
      role: "Project Manager",
      company: "GlobalReach",
      rating: 4,
      review: "Excellent platform for our international projects. The speed and accuracy of translations have improved our workflow significantly.",
      metadata: "Managed translations for 15+ languages",
      icon: <Globe size={16} />
    },
    {
      name: "David Chen",
      role: "Technical Writer",
      company: "DevDocs",
      rating: 5,
      review: "As a technical writer, I need precise translations. AnyTrans delivers consistently high-quality results while preserving technical terminology.",
      metadata: "Translated 100+ technical documents",
      icon: <FileText size={16} />
    },
    {
      name: "Emma Thompson",
      role: "E-learning Specialist",
      company: "EduTech",
      rating: 5,
      review: "The platform makes it easy to localize our educational content. The user interface is clean and the results are always professional.",
      metadata: "Localized 25+ courses",
      icon: <Video size={16} />
    },
    {
      name: "James Wilson",
      role: "Marketing Coordinator",
      company: "StartupHub",
      rating: 4,
      review: "Great value for money. The personal plan is perfect for our startup needs, and the translation quality exceeds expectations.",
      metadata: "Translated content for 8+ markets",
      icon: <Globe size={16} />
    }
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-[50px] leading-[1.3] text-[#142457] font-inter mb-4">
            What Our Users Say
          </h2>
          <p className="text-base lg:text-lg text-[#717680] font-nunito max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust AnyTrans for their translation needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Subtitles, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

function FeatureCard({ title, description, href, icon, isHighlighted = false }: FeatureCardProps) {
  return (
    <Link href={href} className="block group h-full">
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer relative overflow-hidden bg-background hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-border hover:border-primary/20">
        <CardHeader className="flex flex-col items-center pt-6 pb-4">
          <div className="w-12 h-12 flex items-center justify-center text-primary mb-2">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-foreground font-inter text-center">
            {title}
          </h3>
        </CardHeader>
        
        <CardContent className="flex-1 px-6 pb-4">
          <p className="text-sm text-muted-foreground font-nunito text-center leading-relaxed">
            {description}
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary"
          >
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function FeatureGrid() {
  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-9">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-[50px] leading-[1.3] text-black text-center max-w-[657px] font-inter">
            We provides best Feature for customer
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            <FeatureCard
              title="Document Translation"
              description="Transform your documents with our advanced AI-powered translation technology for accurate, professional results."
              href="/features/document-translation"
              icon={<FileText size={24} />}
            />
            
            <FeatureCard
              title="Subtitle Translation"
              description="Seamlessly translate video subtitles while maintaining perfect timing and context for global audiences."
              href="/features/subtitle-translation"
              icon={<Subtitles size={24} />}
            />
            
            <FeatureCard
              title="Real-time Translation"
              description="Experience instant translation capabilities with our cutting-edge real-time processing engine."
              href="#"
              icon={<Zap size={24} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

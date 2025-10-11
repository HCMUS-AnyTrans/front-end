import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentContainer({ children, className = "" }: ContentContainerProps) {
  return (
    <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

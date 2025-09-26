import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <Link href="/" className="mx-auto mb-6">
          <h1 className="font-bold text-2xl text-[#19398f] font-nunito">
            anytrans
          </h1>
        </Link>
        <CardTitle className="text-2xl font-semibold font-inter">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground font-inter">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

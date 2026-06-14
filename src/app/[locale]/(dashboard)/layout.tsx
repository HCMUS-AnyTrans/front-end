"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, DashboardHeader } from "@/features/dashboard"
import { ProtectedRoute } from "@/features/auth"
import { useDomains } from '@/features/domains'
import { TranslationSocketProvider } from "@/features/documents/components/translation-socket-provider"
import { GlossarySocketProvider } from "@/features/glossary"

function getSidebarDefaultOpen(): boolean {
  if (typeof document === "undefined") return true
  const match = document.cookie.match(/(?:^|;\s*)sidebar_state=([^;]*)/)
  if (!match) return true
  return match[1] === "true"
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [defaultOpen] = useState(getSidebarDefaultOpen)

  useDomains()

  return (
    <ProtectedRoute>
      <TranslationSocketProvider />
      <GlossarySocketProvider />
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset className="h-svh overflow-hidden bg-[#f6f8ff] md:border-l md:border-border md:shadow-[-18px_0_44px_rgba(15,23,42,0.08)] dark:bg-background dark:md:shadow-[-18px_0_44px_rgba(0,0,0,0.35)]">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto bg-[#f6f8ff] [scrollbar-gutter:stable] dark:bg-background">
            <div className="px-4 md:px-(--dashboard-content-margin)">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}

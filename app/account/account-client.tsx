"use client";

import React, { useState } from "react";
import { User, CreditCard, Shield, Settings, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/src/components/common/Header";
import Footer from "@/src/components/Footer";
import ProfileTab from "@/src/components/account/ProfileTab";
import BillingTab from "@/src/components/account/BillingTab";

interface SidebarItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function SidebarItem({ id, label, icon, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
        active 
          ? "bg-[#19398f] text-white" 
          : "text-[#717680] hover:bg-gray-100 hover:text-[#142457]"
      }`}
    >
      {icon}
      <span className="font-nunito font-semibold">{label}</span>
    </button>
  );
}

export default function AccountPageClient() {
  const [activeSection, setActiveSection] = useState("profile");

  // Mock user data - in real app this would come from auth context
  const userData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+84 123 456 789",
    company: "AnyTrans Inc.",
    avatar: undefined,
  };

  const sidebarItems = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
    },
    {
      id: "preferences",
      label: "Preferences", 
      icon: <Settings size={20} />,
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield size={20} />,
    },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard size={20} />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={20} />,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
      case "preferences":
      case "security":
      case "notifications":
        return <ProfileTab userData={userData} />;
      case "billing":
        return <BillingTab />;
      default:
        return <ProfileTab userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-48 top-[500px] w-[400px] h-[400px] lg:w-[634px] lg:h-[634px] bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20"></div>
        <div className="absolute right-[-120px] top-[200px] w-[400px] h-[400px] lg:w-[634px] lg:h-[634px] bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#142457] font-inter mb-2">
                Account Settings
              </h1>
              <p className="text-lg text-[#717680] font-nunito">
                Manage your profile, preferences, security, and billing settings
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="border-gray-200 sticky top-4">
                  <CardContent className="p-4">
                    <nav className="space-y-2">
                      {sidebarItems.map((item) => (
                        <SidebarItem
                          key={item.id}
                          id={item.id}
                          label={item.label}
                          icon={item.icon}
                          active={activeSection === item.id}
                          onClick={() => setActiveSection(item.id)}
                        />
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Section Header */}
                  <div>
                    <h2 className="text-2xl font-semibold text-[#142457] font-inter capitalize">
                      {activeSection}
                    </h2>
                    <p className="text-[#717680] font-nunito mt-1">
                      {activeSection === "profile" && "Update your personal information and avatar"}
                      {activeSection === "preferences" && "Customize your experience and notification settings"}
                      {activeSection === "security" && "Manage your password and security settings"}
                      {activeSection === "billing" && "View and manage your subscription and payment methods"}
                      {activeSection === "notifications" && "Control how and when you receive notifications"}
                    </p>
                  </div>

                  {/* Dynamic Content */}
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Shield, Smartphone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AvatarUploader from "./AvatarUploader";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type SecurityFormData = z.infer<typeof securitySchema>;

interface ProfileTabProps {
  userData?: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    avatar?: string;
  };
}

export default function ProfileTab({ userData }: ProfileTabProps) {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    twoFactorEnabled: false,
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userData?.fullName || "John Doe",
      email: userData?.email || "john.doe@example.com",
      phone: userData?.phone || "",
      company: userData?.company || "",
    },
  });

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile update:", data);
    alert("Profile updated successfully!");
  };

  const onSecuritySubmit = (data: SecurityFormData) => {
    console.log("Security update:", data);
    alert("Password changed successfully!");
    securityForm.reset();
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const mockSessions = [
    { id: '1', device: 'Chrome on Windows', location: 'Ho Chi Minh City, Vietnam', lastActive: '2 minutes ago', current: true },
    { id: '2', device: 'Safari on iPhone', location: 'Ho Chi Minh City, Vietnam', lastActive: '1 hour ago', current: false },
  ];

  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#142457] font-inter">Profile Picture</h3>
        </CardHeader>
        <CardContent className="flex justify-center">
          <AvatarUploader 
            currentAvatar={userData?.avatar}
            userName={userData?.fullName || "John Doe"}
            onAvatarChange={(file) => console.log("Avatar changed:", file.name)}
          />
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#142457] font-inter">Personal Information</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-[#142457] font-nunito font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  {...profileForm.register("fullName")}
                  className="mt-1"
                />
                {profileForm.formState.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 font-nunito">
                    {profileForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-[#142457] font-nunito font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  {...profileForm.register("email")}
                  disabled
                  className="mt-1 bg-gray-50"
                />
                <p className="text-xs text-[#717680] mt-1 font-nunito">
                  Contact support to change your email address
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-[#142457] font-nunito font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  {...profileForm.register("phone")}
                  className="mt-1"
                  placeholder="+84 123 456 789"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-[#142457] font-nunito font-semibold">
                  Company
                </Label>
                <Input
                  id="company"
                  {...profileForm.register("company")}
                  className="mt-1"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <Button type="submit" className="bg-[#19398f] hover:bg-[#142457] cursor-pointer">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#142457] font-inter">Preferences</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-[#142457] font-nunito font-semibold mb-2 block">
                Theme
              </Label>
              <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[#142457] font-nunito font-semibold mb-2 block">
                Language
              </Label>
              <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Vietnamese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-[#142457] font-nunito font-semibold">Email Notifications</Label>
              <p className="text-sm text-[#717680] font-nunito">Receive updates about your account and translations</p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-[#142457] font-inter">Security</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Change Password */}
          <div>
            <h4 className="font-semibold text-[#142457] font-inter mb-4">Change Password</h4>
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-[#142457] font-nunito font-semibold">
                  Current Password *
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    {...securityForm.register("currentPassword")}
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#717680] cursor-pointer"
                  >
                    {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {securityForm.formState.errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1 font-nunito">
                    {securityForm.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPassword" className="text-[#142457] font-nunito font-semibold">
                    New Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      {...securityForm.register("newPassword")}
                      className="mt-1 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#717680] cursor-pointer"
                    >
                      {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {securityForm.formState.errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1 font-nunito">
                      {securityForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-[#142457] font-nunito font-semibold">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      {...securityForm.register("confirmPassword")}
                      className="mt-1 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#717680] cursor-pointer"
                    >
                      {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {securityForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 font-nunito">
                      {securityForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" className="bg-[#19398f] hover:bg-[#142457] cursor-pointer">
                Update Password
              </Button>
            </form>
          </div>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-[#142457] font-nunito font-semibold">Two-Factor Authentication</Label>
              <p className="text-sm text-[#717680] font-nunito">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={preferences.twoFactorEnabled}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, twoFactorEnabled: checked }))}
            />
          </div>

          <Separator />

          {/* Active Sessions */}
          <div>
            <h4 className="font-semibold text-[#142457] font-inter mb-4">Active Sessions</h4>
            <div className="space-y-3">
              {mockSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#19398f]/10 rounded-full flex items-center justify-center">
                      <Smartphone size={16} className="text-[#19398f]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#142457] font-nunito">
                        {session.device}
                        {session.current && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Current</span>}
                      </p>
                      <p className="text-sm text-[#717680] font-nunito">{session.location} • {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

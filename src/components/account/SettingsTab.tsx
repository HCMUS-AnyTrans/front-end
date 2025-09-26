"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  getLanguage, 
  setLanguage, 
  getTheme, 
  setTheme, 
  resetToDefaults,
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  type Language,
  type Theme
} from "@/src/lib/prefs";

const settingsSchema = z.object({
  language: z.enum(['en', 'vi']),
  theme: z.enum(['light', 'dark', 'system']),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsTab() {
  const { theme, setTheme: setNextTheme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      language: DEFAULT_LANGUAGE,
      theme: DEFAULT_THEME,
    },
  });

  const { watch, setValue, handleSubmit, formState: { isDirty }, reset } = form;

  // Ensure component is mounted before accessing localStorage
  useEffect(() => {
    setMounted(true);
    
    // Load current preferences
    const currentLanguage = getLanguage();
    const currentTheme = getTheme();
    
    setValue('language', currentLanguage);
    setValue('theme', currentTheme);
    
    // Reset form dirty state after loading initial values
    setTimeout(() => reset({ language: currentLanguage, theme: currentTheme }), 0);
  }, [setValue, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      // Save language preference
      setLanguage(data.language);
      
      // Save theme preference
      setTheme(data.theme);
      setNextTheme(data.theme);
      
      // Reset form dirty state
      reset(data);
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setValue('language', DEFAULT_LANGUAGE);
    setValue('theme', DEFAULT_THEME);
    setNextTheme(DEFAULT_THEME);
    reset({ language: DEFAULT_LANGUAGE, theme: DEFAULT_THEME });
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#142457] font-inter">
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#142457] font-inter">
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Interface Language */}
          <div className="space-y-3">
            <Label htmlFor="language" className="text-sm font-medium text-[#142457] font-nunito">
              Interface Language
            </Label>
            <Select
              value={watch('language')}
              onValueChange={(value: Language) => setValue('language', value, { shouldDirty: true })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Theme */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-[#142457] font-nunito">
              Theme
            </Label>
            <RadioGroup
              value={watch('theme')}
              onValueChange={(value: Theme) => setValue('theme', value, { shouldDirty: true })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="text-sm font-nunito cursor-pointer">
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="text-sm font-nunito cursor-pointer">
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="text-sm font-nunito cursor-pointer">
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Success Message */}
          {showSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700 font-nunito">
                Settings saved successfully!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={!isDirty}
              className="bg-[#19398f] hover:bg-[#142457] text-white font-semibold font-nunito cursor-pointer"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="border-[#19398f] text-[#19398f] hover:bg-[#19398f] hover:text-white font-semibold font-nunito cursor-pointer"
            >
              Reset to Defaults
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

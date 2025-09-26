"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export default function ContactForm({ 
  title = "Send us a Message",
  subtitle = "Fill out the form below and we'll get back to you as soon as possible.",
  onSubmit
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default mock submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Thank you for your message! We'll get back to you soon.");
      }
      
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-[#142457] font-inter">
          {title}
        </h2>
        <p className="text-[#717680] font-nunito">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-[#142457] font-nunito font-semibold">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-nunito">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-[#142457] font-nunito font-semibold">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-nunito">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="subject" className="text-[#142457] font-nunito font-semibold">
              Subject *
            </Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className={`mt-1 ${errors.subject ? "border-red-500" : ""}`}
              placeholder="What is this about?"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1 font-nunito">{errors.subject}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message" className="text-[#142457] font-nunito font-semibold">
              Message *
            </Label>
            <textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-[#19398f] font-nunito ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tell us more about your inquiry..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1 font-nunito">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#19398f] hover:bg-[#142457] text-white font-semibold py-3 font-nunito cursor-pointer"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <Send size={16} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
  Youtube,
  CheckCircle2,
  ArrowRight,
  Globe,
  Headphones,
  Users,
} from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Our team will respond within 24 hours',
      contact: 'support@anytrans.com',
      color: 'blue',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 6pm',
      contact: '+1 (555) 123-4567',
      color: 'green',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Available 24/7 for instant support',
      contact: 'Start Chat',
      color: 'purple',
    },
  ];

  const offices = [
    {
      city: 'San Francisco',
      country: 'USA',
      address: '123 Market Street, Suite 500',
      zipcode: 'CA 94103',
    },
    {
      city: 'London',
      country: 'UK',
      address: '45 Kings Road, Chelsea',
      zipcode: 'SW3 4ND',
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '1 Marina Boulevard #28-00',
      zipcode: '018989',
    },
  ];

  const socialLinks = [
    { icon: Twitter, name: 'Twitter', url: '#', color: 'text-blue-400' },
    { icon: Linkedin, name: 'LinkedIn', url: '#', color: 'text-blue-600' },
    { icon: Facebook, name: 'Facebook', url: '#', color: 'text-blue-500' },
    { icon: Instagram, name: 'Instagram', url: '#', color: 'text-pink-500' },
    { icon: Github, name: 'GitHub', url: '#', color: 'text-gray-700' },
    { icon: Youtube, name: 'YouTube', url: '#', color: 'text-red-600' },
  ];

  const reasons = [
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Multilingual support staff',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Offices in 3 continents',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions about our translation services? Our team is here to
            help you succeed.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Contact Methods */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const colorClasses: Record<string, string> = {
                  blue: 'bg-blue-50 text-blue-600',
                  green: 'bg-green-50 text-green-600',
                  purple: 'bg-purple-50 text-purple-600',
                };

                return (
                  <div
                    key={method.title}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${colorClasses[method.color]}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {method.description}
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {method.contact}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Main Content Grid */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll respond within 24
                      hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Office Locations */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Office Locations
                      </h3>
                      <p className="text-sm text-gray-600">
                        Visit us at our offices worldwide
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {offices.map((office, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <h4 className="font-bold text-gray-900 mb-1">
                          {office.city}, {office.country}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {office.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          {office.zipcode}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Working Hours
                      </h3>
                      <p className="text-sm text-gray-600">
                        When you can reach us
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-semibold text-gray-900">
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-semibold text-gray-900">
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold text-gray-900">
                        Closed
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-900">
                      <strong>24/7 Support:</strong> Live chat available anytime
                    </p>
                  </div>
                </div>

                {/* Why Contact Us */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                  <div className="space-y-3">
                    {reasons.map((reason) => {
                      const Icon = reason.icon;
                      return (
                        <div
                          key={reason.title}
                          className="flex items-start gap-3"
                        >
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">
                              {reason.title}
                            </h4>
                            <p className="text-sm text-blue-100">
                              {reason.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Connect With Us
                </h3>
                <p className="text-gray-600">
                  Follow us on social media for updates and translation tips
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.name}
                      className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 px-6 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 transition-all"
                    >
                      <Icon className={`w-5 h-5 ${social.color}`} />
                      {social.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ CTA */}
          <section>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-center text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Have a Question?
                </h2>
                <p className="text-lg text-purple-100 mb-8">
                  Check out our FAQ section for quick answers to common
                  questions about our translation services.
                </p>
                <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg">
                  Visit FAQ
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

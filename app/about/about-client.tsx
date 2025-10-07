import React from 'react';
import {
  Target,
  Zap,
  Shield,
  Heart,
  Globe,
  Sparkles,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function AboutPage() {
  const coreValues = [
    {
      icon: Target,
      title: 'Precision',
      description:
        'We deliver accurate translations that preserve meaning and context across languages.',
      color: 'blue',
    },
    {
      icon: Zap,
      title: 'Speed',
      description:
        'Lightning-fast translation without compromising quality, powered by advanced AI.',
      color: 'purple',
    },
    {
      icon: Shield,
      title: 'Security',
      description:
        'Your documents are protected with enterprise-grade encryption and privacy.',
      color: 'green',
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description:
        'Built with simplicity and user experience at the heart of every feature.',
      color: 'pink',
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'Company Founded',
      description:
        'AnyTrans was born from a vision to make translation accessible to everyone.',
    },
    {
      year: '2022',
      title: '10K+ Users',
      description:
        'Reached our first major milestone with users from 50+ countries.',
    },
    {
      year: '2023',
      title: 'AI Integration',
      description:
        'Launched advanced AI-powered translation engine with 98% accuracy.',
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description:
        'Expanded to support 100+ languages and opened offices in 3 continents.',
    },
  ];

  const stats = [
    { number: '100+', label: 'Languages Supported' },
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Documents Translated' },
    { number: '98%', label: 'Accuracy Rate' },
  ];

  const team = [
    {
      name: 'Minh Nguyen',
      role: 'CEO & Founder',
      image: '/MinhNguyen01.jpg',
      bio: 'Former Google Translate engineer with 10+ years in NLP',
    },
    {
      name: 'Trong Nhan',
      role: 'CTO',
      image: '/TrongNhan01.jpg',
      bio: 'AI researcher specializing in machine translation systems',
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    pink: 'bg-pink-50 text-pink-600',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">About AnyTrans</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Breaking Language Barriers,
            <br />
            One Translation at a Time
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            We're on a mission to make professional translation accessible to
            everyone, empowering global communication through innovative AI
            technology.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <p className="text-3xl font-bold mb-1">{stat.number}</p>
                <p className="text-sm text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From a small team with a big vision to a global platform trusted
                by thousands
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To democratize professional translation services by leveraging
                  cutting-edge AI technology, making it fast, accurate, and
                  accessible to businesses and individuals worldwide. We believe
                  that language should never be a barrier to opportunity,
                  knowledge, or connection.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To create a world where language differences don't limit human
                  potential. We envision a future where everyone can communicate
                  seamlessly across borders, cultures, and languages, fostering
                  global collaboration and understanding through innovative
                  translation technology.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Core Values
              </h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[value.color]}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600">
                Key milestones in our growth story
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 transform -translate-x-1/2"></div>

              <div className="space-y-8">
                {milestones.map((milestone, idx) => (
                  <div
                    key={milestone.year}
                    className={`flex items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <div
                      className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
                    >
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all inline-block w-full lg:w-auto">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="text-2xl font-bold text-blue-600">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="hidden lg:block relative">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-gray-50"></div>
                    </div>

                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                The passionate people behind AnyTrans
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-gray-100 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-all">
                        <Linkedin className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="w-8 h-8 bg-gray-100 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-all">
                        <Twitter className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="w-8 h-8 bg-gray-100 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-all">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Break Language Barriers?
                </h2>
                <p className="text-lg text-blue-100 mb-8">
                  Join thousands of users who trust AnyTrans for their
                  translation needs. Start translating documents today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold transition-all">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Connect With Us
                </h3>
                <p className="text-gray-600">
                  Follow us on social media for updates and tips
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 px-6 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 transition-all">
                  <Twitter className="w-5 h-5" />
                  Twitter
                </button>
                <button className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 px-6 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 transition-all">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </button>
                <button className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 px-6 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 transition-all">
                  <Github className="w-5 h-5" />
                  GitHub
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

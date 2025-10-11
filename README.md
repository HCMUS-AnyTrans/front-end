# AnyTrans Frontend

> Translate smarter, not harder. AnyTrans gives you speed, accuracy, and the latest features to manage all your content with ease.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8)
![License](https://img.shields.io/badge/License-Private-red)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [Code Quality](#code-quality)
- [Contributing](#contributing)

## 🎯 Overview

AnyTrans is a modern, AI-powered translation platform that enables users to translate documents and subtitles with high accuracy and speed. Built with Next.js 15 and React 19, it provides a seamless user experience with enterprise-grade security and performance.

### Key Highlights

- **100+ Languages Supported** - Comprehensive language coverage for global reach
- **98% Accuracy Rate** - AI-powered translation engine for precise results
- **50K+ Active Users** - Trusted by individuals and enterprises worldwide
- **1M+ Documents Translated** - Proven track record of reliable service

## ✨ Features

### Core Features

- **Document Translation**
  - Support for multiple file formats (DOCX, PDF, XLSX, etc.)
  - Batch processing capabilities
  - Real-time translation progress tracking
  - Word and page count analysis

- **Subtitle Translation**
  - Movie and TV show subtitle support
  - Context-aware translation with movie metadata
  - Timeline preservation
  - Speaker identification
  - Multiple subtitle format support (SRT, VTT, etc.)

- **Dashboard**
  - Real-time activity monitoring
  - Translation statistics and analytics
  - Weekly activity charts
  - Top languages insights
  - Quick action shortcuts

- **Translation History**
  - Complete translation records
  - Search and filter capabilities
  - Status tracking
  - Download translated files

### User Management

- **Authentication System**
  - Email/Password login
  - OAuth integration (Google, Facebook, Apple)
  - OTP verification
  - Password recovery and reset
  - Remember me functionality

- **Account Management**
  - Profile customization
  - Billing and subscription management
  - Payment method management
  - Usage statistics
  - Account settings and preferences

### Additional Features

- **Pricing Plans**
  - Personal plans (Starter, Plus)
  - Enterprise plans (Starter, Growth, Custom)
  - Flexible billing options
  - Credit-based system

- **Support System**
  - 24/7 customer support
  - Help center with FAQs
  - Live chat integration
  - Ticket management

- **Notifications**
  - Real-time notification system
  - Translation completion alerts
  - System announcements
  - Activity updates

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5.x** - Type-safe development

### UI & Styling

- **TailwindCSS 4.x** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark mode support

### Form & Validation

- **React Hook Form 7.63** - Performant form management
- **Zod 4.1.11** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### State Management

- **Zustand 5.0.8** - Lightweight state management
- **React Context API** - Built-in state management

### Development Tools

- **Turbopack** - Fast bundler for Next.js
- **ESLint 9** - Code linting
- **Prettier 3.6** - Code formatting
- **PostCSS** - CSS processing

### Additional Libraries

- **Sonner** - Toast notifications
- **Class Variance Authority** - CSS class management
- **clsx & tailwind-merge** - Conditional styling

## 📁 Project Structure

```
anytrans-frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/               # Login page
│   │   ├── signup/              # Signup page
│   │   ├── verify-otp/          # OTP verification
│   │   ├── forgot-password/     # Password recovery
│   │   ├── reset-password/      # Password reset
│   │   ├── actions.ts           # Server actions
│   │   └── schemas.ts           # Validation schemas
│   ├── dashboard/               # User dashboard
│   ├── features/                # Feature pages
│   │   ├── document-translation/
│   │   └── subtitle-translation/
│   ├── translation-history/     # Translation records
│   ├── pricing/                 # Pricing plans
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── support/                 # Support center
│   ├── notifications/           # Notification center
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
│
├── src/
│   ├── components/              # React components
│   │   ├── About/              # About page components
│   │   ├── Account/            # Account management
│   │   │   ├── Profile/       # User profile
│   │   │   ├── Billing/       # Billing & payments
│   │   │   └── Settings/      # Account settings
│   │   ├── Auth/               # Auth components
│   │   ├── Common/             # Shared components
│   │   ├── Contact/            # Contact components
│   │   ├── Dashboard/          # Dashboard components
│   │   ├── HomePage/           # Homepage sections
│   │   ├── Layout/             # Layout components
│   │   ├── Notifications/      # Notification components
│   │   ├── Pricing/            # Pricing components
│   │   ├── Support/            # Support components
│   │   ├── Translation/        # Translation features
│   │   ├── TranslationHistory/ # History components
│   │   ├── Header.tsx          # Global header
│   │   └── Footer.tsx          # Global footer
│   │
│   ├── contexts/               # React contexts
│   │   └── AccountDialogContext.tsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── use-media-query.ts
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── about-data.ts      # About page data
│   │   ├── contact-data.ts    # Contact info
│   │   ├── pricing-data.ts    # Pricing data
│   │   ├── pricing-plans.ts   # Plan configurations
│   │   └── prefs.ts           # User preferences
│   │
│   └── types/                  # TypeScript types
│       ├── about.ts
│       ├── account.ts
│       ├── contact.ts
│       ├── dashboard.ts
│       ├── notifications.ts
│       ├── pricing.ts
│       ├── sidebar.ts
│       ├── support.ts
│       ├── translation-history.ts
│       └── translation.ts
│
├── components/                 # shadcn/ui components
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       └── ... (more UI components)
│
├── lib/
│   └── utils.ts               # Utility functions
│
├── public/                    # Static assets
│   ├── Logo.svg
│   ├── LogoName.svg
│   ├── Banner-Homepage.svg
│   └── ... (more assets)
│
├── components.json            # shadcn/ui config
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.mjs         # ESLint configuration
├── postcss.config.mjs        # PostCSS configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher (or yarn/pnpm)
- **Git** for version control

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd anytrans-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Development Workflow

1. **Create a new branch** for your feature/fix
2. **Make your changes** following the code style
3. **Test your changes** thoroughly
4. **Commit with clear messages**
5. **Push and create a pull request**

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
@/*              → Root directory
@types/*         → src/types/*
@components/*    → src/components/*
@hooks/*         → src/hooks/*
@lib/*           → src/lib/*
@utils/*         → src/utils/*
@contexts/*      → src/contexts/*
@pages/*         → src/pages/*
@styles/*        → src/styles/*
```

### Component Structure

Components follow a modular structure with:

- Separate files for logic and presentation
- Index files for clean exports
- TypeScript interfaces in dedicated type files
- Reusable base components in `Common/`

### Styling Guidelines

- Use TailwindCSS utility classes
- Follow the design system in `globals.css`
- Use CSS variables for theming
- Leverage shadcn/ui components for consistency
- Support dark mode with `next-themes`

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized production build using Turbopack.

### Start Production Server

```bash
npm run start
```

Starts the production server on port 3000.

### Deployment Options

#### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy automatically

#### Other Platforms

The application can be deployed to any platform that supports Next.js:

- AWS Amplify
- Google Cloud Platform
- Azure Static Web Apps
- Netlify
- Docker containers

### Environment Variables

Make sure to set all required environment variables in your deployment platform.

## 🧹 Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Code Formatting

The project uses Prettier for consistent code formatting. Configure your editor to format on save.

### Type Safety

TypeScript is configured with strict mode for maximum type safety. All components and functions should be properly typed.

## 🤝 Contributing

### Development Guidelines

1. **Follow the existing code style**
2. **Write meaningful commit messages**
3. **Add TypeScript types for all new code**
4. **Test your changes across different screen sizes**
5. **Ensure accessibility standards are met**
6. **Document complex logic with comments**

### Component Guidelines

- Use functional components with hooks
- Implement proper error boundaries
- Handle loading states appropriately
- Optimize performance with React.memo when needed
- Follow the Single Responsibility Principle

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📝 License

This project is private and proprietary.

## 👥 Team

- **Minh Nguyen** - CEO & Founder
- **Trong Nhan** - CTO

## 🌐 Links

- **Production**: [Coming Soon]
- **Staging**: [Coming Soon]
- **Documentation**: [Coming Soon]

## 📞 Support

For support and questions:

- Email: support@anytrans.com
- Phone: +1 (555) 123-4567
- Live Chat: Available 24/7

---

**Built with ❤️ by the AnyTrans Team**

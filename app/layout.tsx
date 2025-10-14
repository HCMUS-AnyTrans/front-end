import type { Metadata } from 'next';
// import { Rubik } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { AccountDialogProvider } from '@/contexts/AccountDialogContext';
import { Toaster } from 'sonner';

// Google Font (commented out)
// const rubik = Rubik({
//   variable: '--font-rubik',
//   subsets: ['latin'],
//   display: 'swap',
// });

// Local Font - SVN Rubik Bold
const rubik = localFont({
  src: '../public/fonts/DVN-Rubik/DVN - Rubik-Bold.ttf',
  variable: '--font-rubik',
  weight: '700',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AnyTrans - Translation Made Simple',
  description:
    'Translate smarter, not harder. AnyTrans gives you speed, accuracy, and the latest features to manage all your content with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} antialiased min-h-screen font-rubik flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

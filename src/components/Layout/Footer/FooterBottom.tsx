import React from 'react';

const legalLinks = [
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export default function FooterBottom() {
  return (
    <>
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-400 text-sm">
          © 2025{' '}
          <span className="text-white font-semibold">Anytrans Inc.</span> All
          rights reserved
        </p>

        <div className="flex items-center gap-6">
          {legalLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && (
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
              )}
              <a
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

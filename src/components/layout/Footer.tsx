'use client';

import { COMPANY_INFO } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="bg-dark-surface py-16 mt-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-white/60 mb-4">{COMPANY_INFO.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-white/60">{COMPANY_INFO.email}</p>
            <p className="text-white/60">{COMPANY_INFO.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {Object.entries(COMPANY_INFO.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  className="text-white/60 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

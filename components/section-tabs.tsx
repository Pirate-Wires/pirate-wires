// components/SectionNavigation.js
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

interface Tab {
  name: string;
  href: string;
}

const tabs: Tab[] = [
  { name: 'Podcast', href: '/podcast' },
  { name: 'Wires', href: '/wires' },
  { name: 'The Industry', href: '/the-industry' },
  { name: 'The White Pill', href: '/white-pill' },
];

const SectionNavigation = () => {
  const currentRoute = usePathname();

  return (
    <div className="py-4">
      {/* Mobile tabs */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select a tab</label>

        {/* ... (same as before) */}
      </div>

      {/* Desktop tabs */}
      <div className="hidden sm:block">
        <nav className="flex space-x-4">
          {tabs.map(tab => (
            <Link key={tab.href} href={tab.href}>
              <div
                className={classNames(
                  'transition-colors duration-300', // Add transition class for smooth color change
                  currentRoute === tab.href
                    ? 'bg-gray-100 text-gray-700'
                    : 'hover:text-gray-700',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={currentRoute === tab.href ? 'page' : undefined}
              >
                {tab.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SectionNavigation;

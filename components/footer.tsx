import React from 'react';
import Container from '@/components/container';
import ThemeSwitch from '@/components/themeSwitch';
import Link from 'next/link';

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
        {/* Column 1: Logo */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Other Stuff</h3>
          <ThemeSwitch />
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/search">Search</Link></li>
            <li><Link href="/archive">The Archives</Link></li>
            <li><Link href="/signin">Sign-in</Link></li>
            {/* Add more links as needed */}
          </ul>

          <div className="text-xs pt-4">
            {props?.copyright} © {new Date().getFullYear()}
          </div>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
          <p className="text-sm text-gray-600">
            Join Pirate Wires and start reading... <br /><small>[magic link creates account / doubles as a login should they happen to have subbed in the past via substack]</small>
          </p>

          <div className="mt-2">
            <input
              type="email"
              placeholder="absolute.unit@example.biz"
              className="w-full px-3 py-2 border rounded-xs outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
            />
            <button className="mt-2 bg-green-600 text-white py-2 px-4 rounded-xs" disabled>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer content */}

      <footer className="border-t dark:border-gray-900 pt-12 mt-24">
        <div className="container mx-auto flex flex-wrap">
          {/* Column 1 */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Landing Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/home/default">Default</Link></li>
              <li><Link href="/home/alt">Alternate</Link></li>
              <li><Link href="/home/minimal">Minimal</Link></li>
              <li><Link href="/home/lifestyle">Lifestyle</Link></li>
              <li><Link href="/home/simple-2-col">Simple Two Column</Link></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Other Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/categories">Categories Page</Link></li>
              <li><Link href="/technology">Example Category Page</Link></li>
              <li><Link href="/authors">Author(s) Page</Link></li>
              <li><Link href="/author/mike-solana">Author Page</Link></li>
              <li><Link href="/search?q=union">Search Page</Link></li>
              <li><Link href="/archive">Archive - Pagination</Link></li>
              <li><Link href="/p/pirate-wires-twitters-final-boss">Single Post - Default</Link></li>
              <li><Link href="/p/minimal/state-of-the-union">Single Post - Minimal</Link></li>
              <li><Link href="/p/lifestyle/pirate-wires-twitters-final-boss">Single Post - Lifestyle</Link></li>
              <li><Link href="/p/sidebar/pirate-wires-twitters-final-boss">Single Post - Sidebar</Link></li>
              {/* Add more links as needed */}
            </ul>
          </div>
          {/* Column 3 */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Section Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/podcast">Podcast Page</Link></li>
              <li><Link href="/wires">Wires Page</Link></li>
              <li><Link href="/the-industry">Industry Page</Link></li>
              <li><Link href="/white-pill">White Pill Page</Link></li>
              {/* Add more links as needed */}
            </ul>
            <h3 className="text-lg font-semibold mb-4 mt-4">Admin Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/studio">CMS</Link></li>
              {/* Add more links as needed */}
            </ul>
            <h3 className="text-lg font-semibold mb-4 mt-4">Experimental Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/podcast-v2">Podcast</Link></li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
      </footer>
    </Container>
  );
}

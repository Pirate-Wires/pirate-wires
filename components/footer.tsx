import React from 'react';
import Container from '@/components/container';
import ThemeSwitch from '@/components/themeSwitch';

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">

        {/* Column 3: Logo */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Other Stuff</h3>
          <ThemeSwitch />
        </div>



        {/* Column 1: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/archive">The Archives</a></li>
            {/* Add more links as needed */}
          </ul>

          <div className="text-xs pt-4">
            {props?.copyright} © {new Date().getFullYear()}
          </div>

        </div>





        {/* Column 2: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <p className="text-sm text-gray-600">
            Subscribe to our newsletter for updates and news.
          </p>

          <div className="mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="py-2 px-3 border rounded-md w-full"
            />
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md">
              Subscribe
            </button>
          </div>
        </div>


      </div>

      {/* <Backlink /> */}
    </Container>
  );
}

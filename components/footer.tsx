import React from 'react';
import Container from '@/components/container';
import ThemeSwitch from '@/components/themeSwitch';

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
            <li><a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/archive">The Archives</a></li>
            <li><a href="/signin">Sign-in</a></li>
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


      {/* 
      
      */}





      <footer className="border-t dark:border-gray-900 pt-12 mt-24">
        <div className="container mx-auto flex flex-wrap">
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Landing Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/home/default" className="hover:text-gray-400">Default</a></li>
              <li><a href="/home/alt" className="hover:text-gray-400">Alternate</a></li>
              <li><a href="/home/minimal" className="hover:text-gray-400">Minimal</a></li>
              <li><a href="/home/lifestyle" className="hover:text-gray-400">Lifestyle</a></li>
              <li><a href="/home/simple-2-col" className="hover:text-gray-400">Simple Two Column</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Other Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/podcast">Podcast Page</a></li>
              <li><a href="/technology">Category Page</a></li>
              <li><a href="/author/mike-solana">Author Page</a></li>
              <li><a href="/search?q=union">Search Page</a></li>
              <li><a href="/archive">Archive - Pagination</a></li>
              <li><a href="/post/pirate-wires-twitters-final-boss">Single Post - Default</a></li>
              <li><a href="/post/minimal/state-of-the-union">Single Post - Minimal</a></li>
              <li><a href="/post/lifestyle/pirate-wires-twitters-final-boss">Single Post - Lifestyle</a></li>
              <li><a href="/post/sidebar/pirate-wires-twitters-final-boss">Single Post - Sidebar</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Admin Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/studio" className="hover:text-gray-400" target="_blank">CMS</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 8</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 9</a></li>
            </ul>
          </div>

        </div>
      </footer>



    </Container>
  );
}

"use client";

import { useState } from 'react';
import Container from "@/components/container";
import General from "@/components/accountNavigation/general";
import Notifications from "@/components/accountNavigation/notifications";
import Plan from "@/components/accountNavigation/plan";
import Billing from "@/components/accountNavigation/billing";
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

const Navigation = [
  { name: 'General', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Newsletter Preferences', href: '#', icon: BellIcon, current: false },
  { name: 'Plan', href: '#', icon: CubeIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AccountDesign() {
  const [selectedNavItem, setSelectedNavItem] = useState(Navigation[0].name);

  return (
    <Container>
      <>
        {/* <div className='border-t border-gray-800 pl-4'>
          <h1>Account</h1>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div> */}
        <div className="border dark:border-gray-800 mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8 ">

          <aside className="flex overflow-x-auto border-r dark:border-gray-800 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
              <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                {Navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        selectedNavItem === item.name
                          ? 'border dark:border-gray-700 text-blue-500'
                          : 'text-gray-700 hover:text-blue-500 hover:bg-gray-900',
                        'group flex gap-x-3 rounded-xs py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                      )}
                      onClick={() => setSelectedNavItem(item.name)}
                    >
                      <item.icon
                        className={classNames(
                          selectedNavItem === item.name
                            ? 'text-blue-500'
                            : 'text-gray-400 group-hover:text-blue-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">

            {selectedNavItem === 'General' && <General />}
            {selectedNavItem === 'Newsletter Preferences' && <Notifications />}
            {selectedNavItem === 'Plan' && <Plan />}
            {selectedNavItem === 'Billing' && <Billing />}
          </main>


        </div>
      </>
    </Container>
  );
}

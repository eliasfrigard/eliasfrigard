'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FI, SE, GB } from 'country-flag-icons/react/3x2'
import { countries } from 'country-flag-icons'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  countries.forEach(code => {
    console.log(`🚩 || ${code} || countries:`, countries)
  })

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      nested: [
        { label: 'Web Development', href: '/services/web-development' },
        { label: 'Design', href: '/services/design' },
        { label: 'Consulting', href: '/services/consulting' }
      ]
    },
    {
      label: 'Work',
      href: '/work',
      nested: [
        { label: 'Projects', href: '/work/projects' },
        { label: 'Case Studies', href: '/work/case-studies' }
      ]
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="w-full bg-white -mb-16 top-0 left-0 right-0 z-50">
        <div className="mx-auto px-4 container">
          <div className="flex justify-between items-center h-[120px]">
            {/* Left side - Your Name */}
            <Link href="/" className="text-5xl font-brettley font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Elias Frigård
            </Link>

            {/* Right side - Hamburger Button */}

            <div className='flex justify-center items-center gap-5'>
              <div className='flex gap-4 h-full'>
                <div className="w-7 aspect-square rounded-full overflow-hidden flex justify-center items-center shadow-md ring-2 ring-white hover:ring-gray-200 transition-all hover:scale-110 cursor-pointer grayscale-[0.8] hover:grayscale-0">
                  <SE title="Sweden" className="w-full h-full object-cover scale-150 translate-x-1" />
                </div>
                <div className="w-7 aspect-square rounded-full overflow-hidden flex justify-center items-center shadow-md ring-2 ring-white hover:ring-gray-200 transition-all hover:scale-110 cursor-pointer grayscale-0">
                  <FI title="Finland" className="w-full h-full object-cover scale-150 translate-x-1" />
                </div>
                <div className="w-7 aspect-square rounded-full overflow-hidden flex justify-center items-center shadow-md ring-2 ring-white hover:ring-gray-200 transition-all hover:scale-110 cursor-pointer grayscale-[0.8] hover:grayscale-0">
                  <GB title="United Kingdom" className="w-full h-full object-cover scale-150" />
                </div>
              </div>

              <button
                onClick={toggleMenu}
                className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                >
                <span
                  className={`w-8 h-1 rounded-full bg-gray-900 transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                    />
                <span
                  className={`w-8 h-1 rounded-full bg-gray-900 transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                    />
                <span
                  className={`w-8 h-1 rounded-full bg-gray-900 transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                    />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Sliding Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Items */}
          <div className="mt-12 space-y-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={!item.nested ? toggleMenu : undefined}
                >
                  {item.label}
                </Link>

                {/* Nested items */}
                {item.nested && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.nested.map((nestedItem, nestedIndex) => (
                      <Link
                        key={nestedIndex}
                        href={nestedItem.href}
                        className="block px-4 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={toggleMenu}
                      >
                        {nestedItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed header */}
      {/* <div className="h-8" /> */}
    </>
  );
}
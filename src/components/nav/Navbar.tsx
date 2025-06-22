'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { navItems, authButtonStyles } from '@/src/constants/navConstants';
import logoImage from '@/src/resources/icons/osb_logo.png';

const Navbar = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Currently using Option 2 (solid) - change this to try different styles
  const selectedStyle = authButtonStyles.minimal;

  const logoComponent = () => {
    return <Link href="/" className="flex items-center">
      <Image src={logoImage}
        className="rounded-full"
        alt="TaskManager Logo"
        width={50}
        height={50}
        priority />
    </Link>;
  };

  const authButtons = () => {
    return <div className="flex items-center space-x-4 ml-6 border-l border-gray-200 pl-6">
      <Link
        href="/login"
        className={`${selectedStyle} ${pathname === '/login'
          ? 'bg-blue-100 text-blue-700 border-blue-300'
          : 'text-blue-600 border-blue-200 hover:bg-blue-50'
          }`}> Login </Link>
      <Link
        href="/register"
        className={`${selectedStyle} ${pathname === '/register'
          ? 'bg-blue-100 text-blue-700 border-blue-300'
          : 'text-blue-600 border-blue-200 hover:bg-blue-50'
          }`}>Register</Link>
    </div>
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {logoComponent()}

          {/* Main Navigation */}
          <div className="flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className="relative group"
                  onMouseEnter={() => item.subItems && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {item.name}
                    {item.subItems && (
                      <span className="ml-1 inline-block">▾</span>
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {item.subItems && (
                    <div
                      className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 ${activeDropdown === item.name
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                        }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`block px-4 py-2 text-sm ${pathname === subItem.path
                            ? 'bg-blue-100 text-blue-800'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {authButtons()}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
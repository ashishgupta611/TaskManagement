'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { navItems } from '@/src/constants/navConstants';
import logoImage from '@/src/resources/images/app_logo.png';

const Navbar = () => {
  const pathname = usePathname();

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {logoComponent()}
          <label className='font-bold text-red-400 text-3xl'>Task Manager</label>
          {/* Main Navigation */}
          <div className="flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.name}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.path
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
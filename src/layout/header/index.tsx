'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';
import { useHeader } from '@/hooks';

import { Button } from '@/components/ui/button';

const headerRoutes = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Courses',
    href: '/courses',
  },
  {
    label: 'Instructor',
    href: '/instructor',
  },
  {
    label: 'Student',
    href: '/student',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];

const Header = () => {
  const { scroll } = useHeader();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className='relative w-full flex justify-center z-10'>
      <div
        className={cn(
          'h-20 w-full flex items-center',
          scroll ? 'fixed bg-white shadow-md' : 'absolute'
        )}
      >
        <div className='container flex items-center justify-between w-full'>
          <Image
            src='/images/logo.svg'
            alt='logo'
            width={150}
            height={150}
            priority
          />
          <div className='flex items-center space-x-6'>
            {headerRoutes.map((route) => (
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  'text-center hover:text-primary-800 font-semibold text-tertiary-800 duration-150',
                  pathName === route.href ? 'text-primary-600' : ''
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div className='grid grid-cols-2 items-center gap-2'>
            <Button onClick={() => router.push('/sign-in')}>Login</Button>
            <Button variant='outline' onClick={() => router.push('/sign-up')}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

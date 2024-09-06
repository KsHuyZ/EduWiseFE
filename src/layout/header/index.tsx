'use client';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { useHeader } from '@/hooks';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

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
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>
              <Image
                src='/images/logo.svg'
                alt='logo'
                width={144}
                height={144}
                priority
              />
            </SheetTitle>
          </SheetHeader>
          <div className='grid grid-cols-1 gap-1 mt-10'>
            {headerRoutes.map((route) => (
              <p
                key={route.href}
                onClick={() => {
                  setOpen(false);
                  router.push(route.href);
                }}
                className={cn(
                  'text-center hover:text-primary-800 font-semibold text-tertiary-800 duration-150 text-lg p-2 rounded-md cursor-pointer',
                  pathName === route.href ? 'text-primary-600' : ''
                )}
              >
                {route.label}
              </p>
            ))}
          </div>
          <Separator className='my-4' />
          <div className='flex flex-col space-y-4'>
            <Button
              onClick={() => {
                setOpen(false);
                router.push('/sign-in');
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                router.push('/sign-up');
              }}
              variant='outline'
            >
              Register
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className='relative w-full flex justify-center z-10'>
        <div
          className={cn(
            'h-20 w-full flex items-center',
            scroll ? 'fixed bg-white shadow-md' : 'absolute'
          )}
        >
          <div className='grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-1 px-5 lg:px-0 items-center w-full'>
            <Menu
              className='text-primary-600 lg:hidden cursor-pointer'
              onClick={() => setOpen(true)}
            />
            <div className='lg:container flex items-center justify-center lg:justify-between w-full'>
              <Image
                src='/images/logo.svg'
                alt='logo'
                width={150}
                height={150}
                priority
              />
              <div className='hidden lg:flex items-center space-x-6'>
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
              <div className='hidden lg:grid grid-cols-2 items-center gap-2'>
                <Button onClick={() => router.push('/sign-in')}>Login</Button>
                <Button
                  variant='outline'
                  onClick={() => router.push('/sign-up')}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

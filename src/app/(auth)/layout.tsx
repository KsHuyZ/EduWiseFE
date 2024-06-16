import Link from 'next/link';
import React from 'react';

import { Label } from '@/components/ui/label';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='dark:bg-gray-900 rounded overflow-hidden'>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col w-full lg:w-1/2 justify-center px-6 py-8 md:h-screen lg:py-0'>
          <Link
            href='#'
            className='flex justify-center lg:justify-start items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white'
          >
            <img className='w-8 h-8 mr-2' src='/images/logo.svg' alt='logo' />
            <Label className='text-lg'>Eduwise</Label>
          </Link>
          <div className='flex justify-center items-center'>
            <div className='w-full dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              {children}
            </div>
          </div>
        </div>
        <div className='w-1/2 h-screen hidden lg:block bg-primary-600 rounded-lg overflow-hidden'>
          <div className='flex flex-col items-center justify-center h-full'>
            <img
              src='/images/illustration_dashboard.png'
              alt='Placeholder Image'
              className='object-cover '
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

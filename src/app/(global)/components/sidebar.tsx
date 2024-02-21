import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

import { SidebarRoutes } from '@/app/(global)/components/sidebar-routes';

const Sidebar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Link
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <NextImage
            className='w-8 h-8 mr-2'
            src='/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
          />
          EduWise
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;

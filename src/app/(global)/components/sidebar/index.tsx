import Link from 'next/link';
import React from 'react';

import { getCookies } from '@/lib/action';

import NextImage from '@/components/NextImage';
import { Label } from '@/components/ui/label';

import { SidebarRoutes } from '@/app/(global)/components/sidebar/components/sidebar-routes';

import { TUser } from '@/types';

const Sidebar = () => {
  const user = getCookies('user') as TUser;
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm'>
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
          <Label>Eduwise</Label>
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes user={user} />
      </div>
    </div>
  );
};

export default Sidebar;

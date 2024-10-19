import React from 'react';

import { getCookies } from '@/lib/action';

import { SidebarRoutes } from '@/app/(global)/components/sidebar/components/sidebar-routes';

import { TUser } from '@/types';

const Sidebar = () => {
  const user = getCookies('user') as TUser;
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm'>
      <div className='flex flex-col w-full px-2'>
        <SidebarRoutes user={user} />
      </div>
    </div>
  );
};

export default Sidebar;

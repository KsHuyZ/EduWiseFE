import React from 'react';

import { getCookies } from '@/lib/action';

import NavbarRoutes from '@/components/navabar-routes';

import MobileSidebar from '@/app/(global)/components/mobile-sidebar';

import { UserType } from '@/types';

const Navbar = () => {
  const user = getCookies('user') as UserType;
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes user={user} />
    </div>
  );
};

export default Navbar;

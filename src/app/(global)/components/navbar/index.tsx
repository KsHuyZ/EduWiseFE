import React from 'react';

import { getCookies } from '@/lib/action';

import MobileSidebar from '@/app/(global)/components/navbar/components/mobile-sidebar';
import NavbarRoutes from '@/app/(global)/components/navbar/components/navbar-routes';

import { TUser } from '@/types';

const Navbar = () => {
  const user = getCookies('user') as TUser;
  return (
    <div className='p-4 border-b h-full flex items-center bg-background/90 backdrop-blur-sm shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes user={user} />
    </div>
  );
};

export default Navbar;

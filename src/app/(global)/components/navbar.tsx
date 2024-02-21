import React from 'react';

import NavbarRoutes from '@/components/navabar-routes';

import MobileSidebar from '@/app/(global)/components/mobile-sidebar';

const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;

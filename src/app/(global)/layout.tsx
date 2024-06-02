import React from 'react';

import Navbar from '@/app/(global)/components/navbar';
import Sidebar from '@/app/(global)/components/sidebar';

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='h-full'>
        <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
          <Navbar />
        </div>
        <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
          <Sidebar />
        </div>
        <main className='md:pl-60 min-h-screen h-full pt-[100px] bg-muted'>
          {children}
        </main>
      </div>
    </>
  );
};

export default GlobalLayout;

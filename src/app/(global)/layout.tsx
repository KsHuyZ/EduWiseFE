import React from 'react';

import Footer from '@/layout/footer';
import Header from '@/layout/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className='min-h-screen'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

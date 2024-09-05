import React from 'react';

import Footer from '@/layout/footer';
import Header from '@/layout/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

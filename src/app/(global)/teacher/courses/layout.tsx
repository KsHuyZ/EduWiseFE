import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Teacher Courses',
  description: 'Courses page',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='m-4'>{children}</div>;
};

export default Layout;

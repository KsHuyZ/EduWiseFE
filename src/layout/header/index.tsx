import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';

const headerRoutes = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Courses',
    href: '/courses',
  },
];

const Header = () => {
  return (
    <div className='flex items-center justify-between'>
      <Image
        src='/images/logo.svg'
        alt='logo'
        width={144}
        height={144}
        objectFit='cover'
        priority
      />
      <div className='flex items-center justify-between'></div>
      <div className='grid grid-cols-2 items-center gap-2'>
        <Button>Login</Button>
        <Button variant='outline'>Register</Button>
      </div>
    </div>
  );
};

export default Header;

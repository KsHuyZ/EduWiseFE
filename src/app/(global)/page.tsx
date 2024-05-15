import React from 'react';

import { getCookies } from '@/lib/action';

import { Label } from '@/components/ui/label';

import { UserType } from '@/types';

const HomePage = () => {
  const user = getCookies('user') as UserType;
  return (
    <div className='flex flex-col space-y-4'>
      <div className='bg-gradient-to-r from-primary-100 to-primary-200 rounded'>
        <div className='flex justify-between'>
          <Label>Welcome back 👋 {user.firstName ?? ''}</Label>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

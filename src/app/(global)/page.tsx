import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getCookies } from '@/lib/action';

import PermissionDenied from '@/components/permission-denied';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import MyCourse from '@/app/(global)/_components/my-course';
import Overview from '@/app/(global)/_components/overview';

import { TUser } from '@/types';

const HomePage = () => {
  const user = getCookies('user') as TUser;
  return user ? (
    <div className='grid grid-cols-3 gap-2'>
      <div className='flex flex-col space-y-8 px-4 col-span-2'>
        <div
          className='rounded-md flex items-center p-8 shadow-md'
          style={{
            background:
              'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)), rgb(255, 255, 255)',
          }}
        >
          <div className='flex justify-between items-center'>
            <div className='flex flex-col space-y-8'>
              <Label className='text-2xl font-bold text-primary-900'>
                Welcome back 👋 {user?.firstName ?? ''}
              </Label>
              <span className='text-primary-800'>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything.
              </span>
              <div>
                <Button>
                  <Link href='/courses'>Go Now</Link>
                </Button>
              </div>
            </div>
          </div>
          <Image
            src='/images/illustration_dashboard1.png'
            width={300}
            height={300}
            alt='dashboard'
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label className='text-lg font-bold'>Continue learning</Label>
          <MyCourse />
        </div>
      </div>
      <Overview />
    </div>
  ) : (
    <PermissionDenied />
  );
};

export default HomePage;

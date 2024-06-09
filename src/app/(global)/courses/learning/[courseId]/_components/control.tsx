import { ChevronsLeft, ChevronsRight, Pause } from 'lucide-react';
import React from 'react';

import NextImage from '@/components/NextImage';

const Control = () => {
  return (
    <div className='bg-[rgba(0, 0, 0, 0.6)] absolute top-0 bottom-0 right-0 left-0 flex-col flex z-[1] justify-between'>
      <div className='flex items-center justify-between m-1 mx-5'>
        <NextImage
          className='w-8 h-8 mr-2'
          src='/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
        />
      </div>
      <div className='flex justify-center items-center'>
        <div className='p-2 py-0 text-primary-600'>
          <ChevronsLeft />
        </div>
        <div className='p-2 py-0 text-primary-600'>
          <Pause />
        </div>
        <div className='p-2 py-0 text-primary-600'>
          <ChevronsRight />
        </div>
      </div>
      <div className='flex items-center p-4 py-0'></div>
    </div>
  );
};

export default Control;

import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';

import NextImage from '@/components/NextImage';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <section className='flex w-full justify-center bg-[url(/images/error-bg1.png)] bg-center bg-no-repeat'>
      <div className=''>
        <div className='flex max-w-screen-sm space-y-10 h-screen flex-col items-center justify-center text-center'>
          <NextImage
            src='/images/logo.svg'
            width={150}
            height={150}
            alt='not found'
            layout='none'
          />
          <NextImage
            src='/images/error-01.png'
            width={400}
            height={400}
            alt='not found'
            layout='none'
          />

          <span className='text-primary-600 mb-4 text-4xl font-extrabold tracking-tight '>
            Oh No! Error 404
          </span>
          <p className='mb-4'>
            This page you requested counld not found. May the force be with you!
          </p>
          <Link
            href='/'
            className='bg-primary-600 hover:bg-primary-800 focus:ring-primary-300  my-4 inline-flex rounded-full px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4'
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Save, X } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Tab from '@/app/(global)/teacher/courses/create/_components/tab';
export const metadata: Metadata = {
  title: 'Create Course',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-screen h-screen bg-white z-50 fixed top-0 left-0'>
      <div className='flex justify-between items-center py-5 p-4 border-b mb-6'>
        <Link
          href='#'
          className='flex items-center text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <NextImage
            className='w-8 h-8 mr-2'
            src='/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
          />
          EduWise
        </Link>
        <div className='flex space-x-2'>
          <Button leftIcon={Save} variant='ghost'>
            Save as Draft
          </Button>
          <Button variant='outline'>Preview</Button>
          <Button variant='primary'>Publish</Button>
          <Link href='/teacher/courses'>
            <Button variant='ghost' leftIcon={X} />
          </Link>
        </div>
      </div>
      <div className='mx-4'>
        <Card className='shadow-md '>
          <CardHeader>
            <CardTitle>Create course</CardTitle>
          </CardHeader>
          <CardContent>
            <Tab>{children}</Tab>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

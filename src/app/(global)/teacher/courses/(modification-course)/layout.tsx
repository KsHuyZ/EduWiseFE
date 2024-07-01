import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import Tab from '@/app/(global)/teacher/courses/__components/tab';
import Header from '@/app/(global)/teacher/courses/(modification-course)/_components/header';
import CourseProvider from '@/app/(global)/teacher/courses/(modification-course)/_provider';
export const metadata: Metadata = {
  title: 'Teacher Courses',
  description: 'Courses page',
};

const Layout = ({
  params: { id },
  children,
}: {
  children: React.ReactNode;
  params: {
    id?: string;
  };
}) => {
  return (
    <div className='m-4'>
      <CourseProvider>
        <div className='w-screen h-screen bg-white z-40 fixed top-0 left-0'>
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
              <Label>EduWise</Label>
            </Link>
            <Header />
          </div>
          <div className='mx-4'>
            <Card className='shadow-md '>
              <CardHeader>
                <CardTitle>{id ? 'Update' : 'Create'} course</CardTitle>
              </CardHeader>
              <CardContent>
                <Tab>{children}</Tab>
              </CardContent>
            </Card>
          </div>
        </div>
      </CourseProvider>
    </div>
  );
};

export default Layout;

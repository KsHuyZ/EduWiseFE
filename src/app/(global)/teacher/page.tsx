import { Book, Play, Signal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getCookies } from '@/lib/action';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

import { TUser } from '@/types';

const TeacherHome = () => {
  const user = getCookies('user') as TUser;
  return (
    <div className='flex flex-col space-y-8 px-4'>
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
        <Label className='text-lg font-bold'>Course overview</Label>
        <div className='grid grid-cols-3 gap-3'>
          <Card className='shadow-md'>
            <CardContent className='flex flex-col my-2 space-y-3'>
              <div className='flex items-center space-x-4'>
                <Label>Total Student</Label>
              </div>
              <Label className='font-bold text-lg'>765</Label>
              <div className='flex items-center space-x-2'>
                <Signal className='w-6 h-6 text-purple-700' />
                <Label>+ 25.12 %</Label>
              </div>
            </CardContent>
          </Card>
          <Card className='shadow-md'>
            <CardContent className='flex flex-col my-2 space-y-3'>
              <div className='flex items-center space-x-4'>
                <div className='p-2 bg-primary-700 text-white rounded-full'>
                  <Book className='w-4 h-4' />
                </div>
                <div className='flex flex-col space-y-2'>
                  <span className='text-gray-400'>Total Courses</span>
                  <Label className='text-xl'>140</Label>
                </div>
              </div>
              <Progress value={15} color='bg-primary-700' />
              <div className='flex items-center space-x-2'>
                <Signal className='w-6 h-6 text-primary-700' />
                <Label>+ 15.12 %</Label>
              </div>
            </CardContent>
          </Card>
          <Card className='shadow-md'>
            <CardContent className='flex flex-col my-2 space-y-3 '>
              <div className='flex items-center space-x-4'>
                <div className='p-2 bg-red-400 text-white rounded-full'>
                  <Play className='w-4 h-4' />
                </div>
                <div className='flex flex-col space-y-2'>
                  <span className='text-gray-400'>Total Hours</span>
                  <Label className='text-xl'>8 hours 22 minutes</Label>
                </div>
              </div>
              <Progress value={65} color='bg-red-400' />
              <div className='flex items-center space-x-2'>
                <Signal className='w-6 h-6 text-red-400' />
                <Label>+ 65.12 %</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;

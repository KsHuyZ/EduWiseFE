import { Book, Clock, Play, Signal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getCookies } from '@/lib/action';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

import { TUser } from '@/types';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const user = getCookies('user') as TUser;
  return (
    <div className='flex flex-col space-y-4'>
      <div className='grid grid-flow-row-dense grid-cols-3 gap-8'>
        <div
          className='rounded-md grid grid-cols-2 gap-2 col-span-2 p-8 shadow-md'
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
        <Carousel className='w-full max-w-xs'>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className='p-1'>
                  <Card>
                    <CardTitle className='text-primary-600'></CardTitle>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      <Image
                        src='/images/java.webp'
                        fill={true}
                        className='w-40 h-40 object-cover rounded-md'
                        alt='Course image'
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className='grid grid-cols-3 gap-3'>
        <Card className='shadow-md'>
          <CardContent className='flex flex-col my-2 space-y-3'>
            <div className='flex items-center space-x-4'>
              <div className='p-2 bg-purple-700 text-white rounded-full'>
                <Clock className='w-4 h-4' />
              </div>
              <div className='flex flex-col space-y-2'>
                <span className='text-gray-400'>Total Hours</span>
                <Label className='text-xl'>46 hours 30 minutes</Label>
              </div>
            </div>
            <Progress value={25} color='bg-purple-700' />
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
  );
};

export default HomePage;

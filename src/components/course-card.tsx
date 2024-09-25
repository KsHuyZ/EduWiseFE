'use client';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { formatPrice, formatTimeToDuration } from '@/utils';

import { ELevel, EStatus, TUser } from '@/types';

export interface CourseCardProps {
  course?: {
    id: string;
    image: string;
    name: string;
    videoPreview: string;
    description: string;
    shortDescription: string;
    createdBy: TUser;
    level: ELevel;
    status: EStatus;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    price: number;
    duration: number;
    willLearn: string[];
  };
  loading?: boolean;
}

const CourseCard = ({ course, loading }: CourseCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Card className='rounded-md overflow-hidden hover:shadow-md group duration-500 h-full cursor-pointer'>
      <div className='w-full aspect-video p-5'>
        {loading ? (
          <Skeleton className='w-full h-50' />
        ) : (
          <Image
            src={course?.image ?? ''}
            className='object-cover w-full h-50 rounded-md duration-150'
            alt={course?.name ?? ''}
            width={150}
            height={150}
          />
        )}
      </div>
      <CardContent className='flex-1'>
        <div className='flex flex-col space-y-5'>
          <div className='flex items-center space-x-2'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className='text-yellow-300 w-5 h-5'
                fill='#fde047'
              />
            ))}{' '}
            <p className='text-tertiary-800 duration-150'>5 (1)</p>
          </div>
          {loading ? (
            <Skeleton className='w-44 h-4' />
          ) : (
            <p className='font-bold text-tertiary-800 text-xl duration-500 max-w-3xl'>
              {course?.name}
            </p>
          )}
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
              <Image
                src={course?.createdBy.avatar ?? ''}
                width={45}
                height={45}
                alt={course?.createdBy.avatar ?? ''}
                className='rounded-full border-2 border-gray-400'
              />
              <div>
                <p className='text-tertiary-800 font-bold text-md group-hover:duration-150'>
                  {course?.createdBy.firstName} {course?.createdBy.lastName}
                </p>
                <p className='text-tertiary-800 group-hover:duration-150'>
                  Instructor
                </p>
              </div>
            </div>
            <button onClick={() => setIsLiked((prev) => !prev)}>
              <Heart
                className='text-primary-600'
                fill={isLiked ? '#ff6575' : 'transparent'}
              />
            </button>
          </div>
          <div className='space-y-3'>
            <div className='my-3 flex items-center justify-between text-sm md:text-xs'>
              <div className='flex items-center gap-x-1 text-slate-500'>
                <Image
                  src='/images/note-book.svg'
                  width={20}
                  height={20}
                  alt='note-book'
                />
                {loading ? (
                  <Skeleton className='w-24 h-4' />
                ) : (
                  <span>40 Lessons</span>
                )}
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-tertiary-800 duration-150'>
                  {formatTimeToDuration(course?.duration ?? 0)}
                </span>
                <Image
                  src='/images/clock.svg'
                  width={20}
                  height={20}
                  alt='clock'
                />
              </div>
            </div>
          </div>
          <Separator className='w-full' />
          <div className='flex items-center justify-between'>
            <p className='text-tertiary-800 font-bold text-xl'>
              {formatPrice(25000)}
            </p>
            <Button>Buy now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

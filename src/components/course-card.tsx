import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { formatPrice } from '@/utils';

import { CourseType } from '@/types';

const CourseCard = ({
  course,
  loading,
}: {
  course?: CourseType;
  loading?: boolean;
}) => {
  return (
    <Card className='rounded-md overflow-hidden hover:bg-primary-50 hover:shadow-md group duration-500 h-full'>
      <div className='relative w-full aspect-video '>
        {loading ? (
          <Skeleton className='w-full h-40' />
        ) : (
          <Image
            src={course?.file.url ?? ''}
            fill
            className='object-cover'
            alt='Hihihihi'
          />
        )}
      </div>
      <CardContent className='flex-1'>
        <div className='space-y-5'>
          <div className='space-y-3'>
            {loading ? (
              <Skeleton className='w-44 h-4' />
            ) : (
              <p className='font-semibold text-base group-hover:text-primary-400 duration-500'>
                {course?.name}
              </p>
            )}

            <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
              <div className='flex items-center gap-x-1 text-slate-500'>
                <div className='p-1 rounded-full bg-primary-200'>
                  <BookOpen className='w-4 h-4 text-primary-600' />
                </div>
                {loading ? (
                  <Skeleton className='w-24 h-4' />
                ) : (
                  <span>40 Chapters</span>
                )}
              </div>
            </div>
            <div className='flex space-x-2'>
              {course?.categories.slice(0, 3).map((category) => (
                <Badge key={Math.random()} variant='outline'>
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
          {loading ? (
            <Skeleton className='w-24 h-4' />
          ) : (
            <p className='text-md md:text-sm font-medium text-slate-700'>
              {course?.price === 0 ? 'Free' : formatPrice(course?.price)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

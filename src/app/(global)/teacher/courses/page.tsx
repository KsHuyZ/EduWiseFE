'use client';
import { BookOpen, Plus, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

import CourseCard from '@/components/course-card';
import Input from '@/components/inputs/Input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useTeacherCourse } from '@/app/(global)/teacher/courses/_hooks';
import { formatPrice } from '@/utils';

const Courses = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      );
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return replace(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  );

  const { data, isLoading } = useTeacherCourse();

  return (
    <div className='p-6 space-y-5'>
      <div className='grid grid-cols-2 gap-2'>
        <Link href='/teacher/courses/create/info'>
          <Button leftIcon={Plus}>New course</Button>
        </Link>
        <div className='flex items-center space-x-2'>
          <Input
            leftIcon={Search}
            placeholder='Eg: Become fullstack developer'
            value={searchParams.get('name') ?? ''}
            onChange={(e) => createQueryString('name', e.target.value)}
          />
          <Select
            value={searchParams.get('type') ?? ''}
            onValueChange={(value) => createQueryString('type', value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select course type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='publish'>Publish</SelectItem>
                <SelectItem value='draft'>Draft</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex flex-col space-y-4'>
        <Label className='text-lg'>My courses</Label>
        {data?.length === 0 && (
          <div className='h-[50vh] w-full flex justify-center items-center'>
            <div className='flex flex-col space-y-4 items-center'>
              <Image
                src='/images/empty.svg'
                width={150}
                height={150}
                alt='Empty image'
              />
              <Label>You don't have any course</Label>
              <Link href='/teacher/courses/create/info'>
                <Button>Create now</Button>
              </Link>
            </div>
          </div>
        )}
        <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <CourseCard loading={isLoading} key={index} />
              ))
            : data?.map((course) => (
                <Link
                  href={`/teacher/courses/edit/info/${course?.id}`}
                  key={course.id}
                >
                  <Card className='rounded-md overflow-hidden hover:bg-primary-50 hover:shadow-md group duration-500 h-full'>
                    <div className='relative w-full aspect-video '>
                      <Image
                        src={course?.image ?? ''}
                        fill
                        className='object-cover'
                        alt='Hihihihi'
                      />
                    </div>
                    <CardContent className='flex-1'>
                      <div className='space-y-5'>
                        <div className='space-y-3'>
                          <p className='font-semibold text-base group-hover:text-primary-400 duration-500'>
                            {course?.name}
                          </p>

                          <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
                            <div className='flex items-center gap-x-1 text-slate-500'>
                              <div className='p-1 rounded-full bg-primary-200'>
                                <BookOpen className='w-4 h-4 text-primary-600' />
                              </div>
                              <span>40 Chapters</span>
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
                        <p className='text-md md:text-sm font-medium text-slate-700'>
                          {course?.price === 0
                            ? 'Free'
                            : formatPrice(course?.price)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

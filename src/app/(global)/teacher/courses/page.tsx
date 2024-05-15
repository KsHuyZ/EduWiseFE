'use client';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import CourseCard from '@/components/course-card';
import Input from '@/components/inputs/Input';
import Paginations from '@/components/pagination';
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

const Courses = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return replace(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  );
  const { data, isLoading, isError, error } = useTeacherCourse();
  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

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
        <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <CourseCard loading={isLoading} key={index} />
            ))
          ) : data?.pages === 0 ? (
            <div>
              <p>You haven't any course</p>
            </div>
          ) : (
            data?.items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </div>
      </div>
      <Paginations
        pageSize={data?.size ?? 8}
        onPageChange={(page) => createQueryString('page', page.toString())}
        totalCount={data?.total ?? 0}
        currentPage={Number(searchParams.get('page')) ?? 1}
      />
    </div>
  );
};

export default Courses;

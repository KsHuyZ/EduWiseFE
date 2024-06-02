'use client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useDebounce } from '@/hooks';

import CourseCard from '@/components/course-card';
import Input from '@/components/inputs/Input';
import { Badge } from '@/components/ui/badge';
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

import FilterSheet from '@/app/(global)/courses/_components/FilterSheet';
import { useCategory, useCourse } from '@/app/(global)/courses/_hooks';

const Courses = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const keyword = searchParams.get('keyword');
  const [searchQuery, setSearchQuery] = useState(keyword ?? '');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value ?? '');
    createQueryString('keyword', value ?? '');
  };

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
  const sortBy = searchParams.get('sortBy');
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const keywordQuery = useDebounce(keyword!, 500);

  const { data, isLoading, isError, error } = useCourse(
    sortBy,
    priceMin,
    priceMax,
    keywordQuery
  );
  const categoryQuery = useCategory();

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <div className='p-6 space-y-5'>
      <div className='grid grid-cols-2 gap-3 justify-between'>
        <Input
          leftIcon={Search}
          placeholder='Eg: Become fullstack developer'
          value={searchQuery}
          onChange={onInputChange}
        />
        <div className='flex justify-end items-center space-x-2'>
          <Select
            value={searchParams.get('sortBy') ?? 'asc'}
            onValueChange={(value) => createQueryString('sortBy', value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value='asc'>Ascending</SelectItem>
                <SelectItem value='desc'>Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FilterSheet />
        </div>
      </div>
      <div className='flex flex-col space-y-8'>
        <div className='flex flex-row items-center space-x-4'>
          {categoryQuery.data?.map((category) => (
            <Badge
              key={category.id}
              variant='outline'
              className='hover:bg-primary-500 duration-150 cursor-pointer'
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <div className='flex flex-col space-y-4'>
          {!isLoading && data?.pages === 0 ? (
            <div className='h-[50vh] w-full flex justify-center items-center'>
              <div className='flex flex-col space-y-4 items-center'>
                <Image
                  src='/images/empty.svg'
                  width={150}
                  height={150}
                  alt='Empty image'
                />
                <Label>We couldn't find the course you were looking for</Label>
              </div>
            </div>
          ) : null}
          <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 items-stretch'>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <CourseCard loading={isLoading} key={index} />
                ))
              : data?.items.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

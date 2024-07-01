'use client';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useCourseStatus } from '@/app/(global)/teacher/courses/(modification-course)/_components/header/_hooks';
import { useCourseForm } from '@/app/(global)/teacher/courses/(modification-course)/_provider';

import { ECourseStatus } from '@/types';

const Header = () => {
  const { mutateAsync, isPending } = useCourseStatus();
  const { id } = useCourseForm();
  const router = useRouter();
  const publicCourse = () => {
    if (id) {
      mutateAsync({ id, status: ECourseStatus.PUBLIC });
      router.replace('/teacher/courses');
    }
  };

  return (
    <div className='flex space-x-2'>
      <Button variant='outline'>Preview</Button>
      <Button onClick={publicCourse} disabled={!id} isLoading={isPending}>
        Publish
      </Button>
      <Link href='/teacher/courses'>
        <Button variant='ghost'>
          <X />
        </Button>
      </Link>
    </div>
  );
};

export default Header;

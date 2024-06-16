'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useEnrollCourse } from '@/app/(global)/courses/[courseId]/_hooks';

const Enroll = ({ id }: { id: string }) => {
  const { mutateAsync, isPending } = useEnrollCourse();
  const router = useRouter();
  const onEnrollCourse = async (id: string) => {
    await mutateAsync(id);
    router.replace(`/courses/learning/${id}`);
  };
  return (
    <Button onClick={() => onEnrollCourse(id)} isLoading={isPending}>
      Enroll Now
    </Button>
  );
};

export default Enroll;

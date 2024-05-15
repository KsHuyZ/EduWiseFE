'use client';
import { ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';

import { ChaptersForm } from '@/app/(global)/teacher/courses/[courseId]/_components/chapter-form';
import FormQuestion from '@/app/(global)/teacher/courses/[courseId]/_components/FormQuestion/FormQuestion';

import { Lesson, Video } from '@/types';

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;
  const router = useRouter();
  const [changeChapter, setChangeChapter] = useState<{
    show: boolean;
    form: Video | undefined;
    id: string | undefined;
  }>({ show: false, form: undefined, id: undefined });
  const [chapters, setChapters] = useState<Lesson[]>([]);
  return (
    <>
      <ArrowLeft className='cursor-pointer' onClick={() => router.back()} />
      <div className='space-y-2 mx-10'>
        <div className='w-full'>
          <ChaptersForm
            courseId={courseId}
            setChangeChapter={setChangeChapter}
            chapters={chapters}
            setChapters={setChapters}
          />
        </div>
        <Button leftIcon={Plus}>Add Chapter</Button>
        {changeChapter.show ? (
          <div className='w-full'>
            {/* <FormVideo
              chapter={changeChapter}
              setChangeChapter={setChangeChapter}
              setChapters={setChapters}
            /> */}
            <FormQuestion />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CourseIdPage;

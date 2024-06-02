'use client';
import { ChevronDown, PlayCircle, StickyNote } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { useLessonList } from '@/app/(global)/courses/[courseId]/_components/course-list/hooks';

interface CourseListProps {
  id: string;
}

const CourseList = ({ id }: CourseListProps) => {
  const { data } = useLessonList(id);
  const [currentLesson, setCurrentLesson] = useState<string[]>([]);

  const lessons = useMemo(() => data?.map((lesson) => lesson.id), [data]) ?? [];

  const handleExpandAll = () => {
    if (currentLesson.length !== data?.length) {
      setCurrentLesson(lessons);
    } else {
      setCurrentLesson([]);
    }
  };

  return (
    <div className='w-full px-2'>
      <div className='flex justify-end'>
        <Button
          variant='ghost'
          className='text-primary-600'
          onClick={handleExpandAll}
        >
          {currentLesson.length === data?.length ? 'Close' : 'Expand'} All
          Sections
        </Button>
      </div>
      <div className='mb-4 duration-150'>
        {data?.map((lesson) => (
          <div
            key={lesson.id}
            className='border-sky-200 bg-primary-50 shadow-sm'
          >
            <div
              className={cn(
                'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md p-4 text-sm mb-1 cursor-pointer',
                'bg-sky-100  text-primary-700'
              )}
              onClick={() =>
                setCurrentLesson((prev) => {
                  if (prev.includes(lesson.id)) {
                    return prev.filter((item) => item !== lesson.id);
                  }
                  return [...prev, lesson.id];
                })
              }
            >
              <span className='font-bold '>{lesson.title}</span>
              <div className='ml-auto pr-2 flex items-center gap-x-2'>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 cursor-pointer hover:opacity-75 transition',
                    currentLesson.includes(lesson.id) ? 'rotate-180' : ''
                  )}
                />
              </div>
            </div>
            <div
              className={cn(
                'no-scrollbar duration-700',
                currentLesson.includes(lesson.id)
                  ? 'overflow-y-scroll max-h-[500px]'
                  : 'max-h-0 overflow-hidden'
              )}
            >
              {lesson.videos.map((video, index) => (
                <div
                  key={video.id}
                  className={cn('flex items-center space-x-2 ')}
                >
                  <div
                    key={`video_${video.id}`}
                    className='cursor-pointer w-full hover:bg-gray-200 m-2 p-2 rounded-sm transition'
                  >
                    <div className='flex items-center mx-3 justify-between'>
                      <div className='flex flex-col'>
                        <span className='text-primary-600'>
                          {index + 1}.{' '}
                          {video.type === 'video' ? 'Lesson' : 'Quiz'}:{' '}
                          {video.title}
                        </span>
                        <div className='flex items-center text-xs'>
                          {video.type === 'video' ? (
                            <PlayCircle size={15} />
                          ) : (
                            <StickyNote size={15} />
                          )}{' '}
                          <span className='ml-2'>20:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

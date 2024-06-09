'use client';
import {
  BookOpen,
  ChevronDown,
  Clock,
  PlayCircle,
  StickyNote,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Spinner from '@/components/loading/spinner';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

import { useCourse } from '@/app/(global)/courses/learning/[courseId]/_hooks';

import { Lesson } from '@/types';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface CourseVideoProps {
  id: string;
}

const CourseVideo = ({ id }: CourseVideoProps) => {
  const [course, lessons] = useCourse(id);
  const [currentLesson, setCurrentLesson] = useState<string[]>([]);
  const [selectLesson, setSelectLesson] = useState<Lesson | undefined>(
    undefined
  );

  useEffect(() => {
    if (lessons.data && !lessons.isLoading) {
      setSelectLesson(lessons.data[0]);
    }
  }, [lessons]);

  return (
    <div className='flex px-5 flex-col space-y-4 overflow-y-scroll h-[calc(100vh-100px)] no-scrollbar'>
      <div className='w-full'>
        <div className='mx-auto'>
          <div>
            <Label className='text-xl font-bold'>
              {!selectLesson ? (
                <Skeleton className='w-64 h-4' />
              ) : (
                selectLesson.title
              )}
            </Label>
          </div>
          <div className='grid grid-cols-4 gap-2 items-stretch overflow-scroll no-scrollbar mt-5'>
            <div className='col-span-3'>
              <Suspense fallback={<Spinner />}>
                <ReactPlayer
                  fallback={<Spinner />}
                  url='/videos/course-example.mp4'
                  playing
                  light='/images/java.webp'
                  pip
                  autoPlay
                  muted={false}
                  width='100%'
                  controls
                  style={{
                    borderRadius: 5,
                    overflow: 'hidden',
                    backgroundColor: '#0000',
                  }}
                >
                  <source
                    autoFocus
                    src='/videos/course-example.mp4'
                    type='video/mp4'
                  />
                </ReactPlayer>
              </Suspense>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <div className='flex flex-col space-y-4'>
                  <span className='text-primary-600'>2/5 COMPLETED</span>
                  <Progress value={40} className='h-2' />
                </div>
              </CardHeader>
              <CardContent className='p-2 space-y-2 overflow-scroll no-scrollbar'>
                {lessons.isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className='shadow-md overflow-hidden'>
                        <div
                          className={cn(
                            'flex items-center gap-x-2 border-slate-200 border text-slate-700 p-4 text-sm mb-1 cursor-pointer',
                            ' text-primary-700'
                          )}
                        >
                          <span className='font-bold '>
                            <Skeleton className='w-40 h-4' />
                          </span>
                          <div className='ml-auto pr-2 flex items-center gap-x-2'>
                            <div className='flex flex-col space-y-2'></div>
                            <ChevronDown
                              className={cn(
                                'w-4 h-4 cursor-pointer hover:opacity-75 transition'
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : lessons.data?.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={cn(
                          'duration-150 hover:border-primary-300 border rounded-md',
                          currentLesson.includes(lesson.id)
                            ? 'border-primary-300'
                            : ''
                        )}
                      >
                        <div
                          className={cn(
                            'flex items-center gap-x-2 text-slate-700 p-2 px-4 text-sm cursor-pointer'
                          )}
                          onClick={() =>
                            setCurrentLesson((prev) => {
                              if (prev.includes(lesson.id)) {
                                return prev.filter(
                                  (item) => item !== lesson.id
                                );
                              }
                              return [...prev, lesson.id];
                            })
                          }
                        >
                          <div className='flex flex-col'>
                            <span
                              className={cn(
                                currentLesson.includes(lesson.id)
                                  ? 'text-primary-600'
                                  : '',
                                'font-bold duration-700'
                              )}
                            >
                              {lesson.title}
                            </span>
                            <div className='flex space-x-2 items-center'>
                              <Clock size={15} />
                              <span
                                className={cn(
                                  currentLesson.includes(lesson.id)
                                    ? 'text-primary-600'
                                    : '',
                                  'text-sm duration-700 hover:text-primary-600'
                                )}
                              >
                                20:20
                              </span>
                            </div>
                          </div>

                          <div className='ml-auto pr-2 flex items-center gap-x-2'>
                            <div className='flex flex-col items-end'>
                              <ChevronDown
                                className={cn(
                                  'w-4 h-4 cursor-pointer hover:opacity-75 transition hover:text-primary-600',
                                  currentLesson.includes(lesson.id)
                                    ? 'rotate-180 text-primary-600'
                                    : ''
                                )}
                              />
                              <div
                                className={cn(
                                  currentLesson.includes(lesson.id)
                                    ? 'text-primary-600'
                                    : '',
                                  'text-sm duration-700 hover:text-primary-600 flex items-center space-x-2'
                                )}
                              >
                                <BookOpen size={15} />
                                <span>
                                  {lesson.units?.length} lesson
                                  {Number(lesson.units?.length) > 0 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={cn(
                            'no-scrollbar duration-700',
                            currentLesson.includes(lesson.id)
                              ? 'max-h-[200px] overflow-y-scroll'
                              : 'max-h-0 overflow-hidden'
                          )}
                        >
                          {lesson.units?.map((video, index) => (
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
                                      {video.type === 'video'
                                        ? 'Lesson'
                                        : 'Quiz'}
                                      : {video.title}
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
              </CardContent>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-4 flex flex-col space-y-2'>
        <Label className='font-bold text-xl'>Description</Label>
        <div
          dangerouslySetInnerHTML={{
            __html: course.data?.description ?? '',
          }}
        />
      </div>
    </div>
  );
};

export default CourseVideo;

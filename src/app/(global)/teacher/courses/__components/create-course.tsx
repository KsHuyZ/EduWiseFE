'use client';
import { produce } from 'immer';
import { Save } from 'lucide-react';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { ChaptersForm } from '@/app/(global)/teacher/courses/__components/chapter-form';
import CreateForm from '@/app/(global)/teacher/courses/(modification-course)/create/_components/create-form';

import { Lesson, Video } from '@/types';

const CreateCourse = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const handleCreateLesson = (lesson: Lesson) => {
    setLessons((prev) => [...prev, lesson]);
  };

  const onAddVideo = (lessonId: string, video: Video) => {
    const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
    setLessons(
      produce((draftLesson) => {
        draftLesson[lessonIndex].videos.push(video);
      })
    );
  };

  // const onAddQuiz = (lessonId, )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>New Course</Button>
      </SheetTrigger>
      <SheetContent side='bottom' className='h-full bg-white overflow-y-scroll'>
        <SheetHeader className='border-b border-gray'>
          <SheetTitle>
            <div className='flex space-x-2 pb-6'>
              <Button leftIcon={Save} variant='ghost'>
                Save as Draft
              </Button>
              <Button variant='outline'>Preview</Button>
              <Button variant='primary'>Publish</Button>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col lg:flex-row justify-between'>
          <Accordion
            type='multiple'
            className='w-full lg:w-3/5 overflow-y-scroll h-screen no-scrollbar'
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger>Course Info</AccordionTrigger>
              <AccordionContent>
                <CreateForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>Course Builder</AccordionTrigger>
              <AccordionContent>
                <div className='space-y-2'>
                  <ChaptersForm
                    lessons={lessons}
                    onAddLesson={handleCreateLesson}
                    onAddVideo={onAddVideo}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className='flex flex-col space-y-5 w-full lg:w-2/6 sticky top-0'>
            <h3>Course Upload Tips</h3>
            <div className='flex flex-col space-y-5'>
              <div className='flex items-baseline space-x-2'>
                <div className='bg-primary-600 p-1 rounded-full' />
                <span>Set the Course Price option or make it free.</span>
              </div>
              <div className='flex items-baseline space-x-2'>
                <div className='bg-primary-600 p-1 rounded-full' />
                <span className='flex'>
                  Standard size for the course thumbnail is 700x430.
                </span>
              </div>
              <div className='flex items-baseline space-x-2'>
                <div className='bg-primary-600 p-1 rounded-full' />
                <span>Video section controls the course overview video.</span>
              </div>
              <div className='flex items-baseline space-x-2'>
                <div className='bg-primary-600 p-1 rounded-full' />
                <span>
                  Course Builder is where you create & organize a course.
                </span>
              </div>
              <div className='flex items-baseline space-x-2'>
                <div className='bg-primary-600 p-1 rounded-full' />
                <span>
                  Add Topics in the Course Builder section to create lessons,
                  quizzes, and assignments.
                </span>
              </div>
              <div className='flex items-baseline space-x-2'>
                <div className='bg-primary-600 p-1 rounded-full' />
                <span>
                  Prerequisites refers to the fundamental courses to complete
                  before taking this particular course.
                </span>
              </div>
              <div className='flex items-baseline space-x-2'>
                <div className='bg-primary-600 p-1 rounded-full' />
                <span>
                  Information from the Additional Data section shows up on the
                  course single page.
                </span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCourse;

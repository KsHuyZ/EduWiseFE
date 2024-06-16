import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useQuestion } from '@/app/(global)/_hooks';
import CountdownTime from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz/components/countdown-time';

import { TUnit } from '@/types';

interface IQuizProps {
  selectUnit?: TUnit;
}

const Quiz = ({ selectUnit }: IQuizProps) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [currentIndex, setCurrentIndex] = useState(
    Number(searchParams.get('question')) ?? 0
  );
  const { data, isLoading } = useQuestion(
    selectUnit?.quizResponse?.id,
    selectUnit?.type
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return replace(`${pathName}?${params.toString()}`);
    },
    [pathName, replace, searchParams]
  );
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              If you submit, your result will be saved and can not be cancel
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className='min-w-full'>
          <div className='flex flex-col space-y-8'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <Clock size={30} />
                <div className='flex flex-col'>
                  <span className='font-bold text-sm text-gray-500'>
                    Time remaining
                  </span>
                  {isLoading ? (
                    <Skeleton className='w-48 h-4' />
                  ) : (
                    <CountdownTime totalSeconds={3600} />
                  )}
                </div>
              </div>
              {isLoading ? (
                <Skeleton className='w-24 h-10' />
              ) : (
                <Button onClick={() => setOpen(true)}>Submit</Button>
              )}
            </div>
            <div className='grid grid-cols-3 gap-3'>
              <div className='flex flex-col space-y-6 col-span-2'>
                <div className='flex flex-col space-y-4'>
                  {isLoading ? (
                    <Skeleton className='w-48 h-4' />
                  ) : (
                    <span className='text-sm font-bold'>
                      Question {currentIndex + 1} of {data?.length}
                    </span>
                  )}
                  <p className='text-xl font-bold'>
                    {isLoading ? (
                      <div className='flex flex-col space-y-2'>
                        <Skeleton className='w-96 h-4' />
                        <Skeleton className='w-96 h-4' />
                        <Skeleton className='w-96 h-4' />
                        <Skeleton className='w-96 h-4' />
                      </div>
                    ) : (
                      data && data[currentIndex].content
                    )}
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  {isLoading && !data
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className='w-48 h-10' />
                      ))
                    : data &&
                      data[currentIndex].choiceResponses.map((choice) => (
                        <Button
                          key={choice.content}
                          variant={!choice.correct ? 'outline' : 'default'}
                        >
                          {choice.content}
                        </Button>
                      ))}
                </div>
              </div>
              <div className='w-full h-full flex items-center justify-center'>
                <div className='relative size-40'>
                  <svg
                    className='size-full'
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      cx='18'
                      cy='18'
                      r='16'
                      fill='none'
                      className='stroke-current text-gray-200 dark:text-neutral-700'
                      stroke-width='2'
                    ></circle>
                    <g className='origin-center -rotate-90 transform'>
                      <circle
                        cx='18'
                        cy='18'
                        r='16'
                        fill='none'
                        className='stroke-current text-primary-600 duration-300'
                        stroke-width='2'
                        stroke-dasharray='100'
                        stroke-dashoffset='60'
                      ></circle>
                    </g>
                  </svg>
                  <div className='absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2'>
                    <span className='text-center text-2xl font-bold text-gray-800 dark:text-white'>
                      72%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <Button
                leftIcon={ChevronLeft}
                variant='outline'
                disabled={currentIndex === 0}
              >
                Back
              </Button>
              <Button
                rightIcon={ChevronRight}
                disabled={currentIndex === Number(data?.length) - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Quiz;

'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Spinner from '@/components/loading/spinner';
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
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import { useLessonList } from '@/app/(global)/courses/_hooks';
import ListUnits from '@/app/(global)/courses/learning/[courseId]/_components/units/components/list-units';
import Quiz from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz';
import Video from '@/app/(global)/courses/learning/[courseId]/_components/units/components/video';

import { EUnitType, TUnit } from '@/types';

interface CourseVideoProps {
  id: string;
}

const CourseVideo = ({ id }: CourseVideoProps) => {
  const { data, isLoading } = useLessonList(id);
  const [currentLesson, setCurrentLesson] = useState<string[]>([]);
  const [selectUnit, setSelectUnit] = useState<TUnit | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (data && !isLoading) {
      const unitId = searchParams.get('unitId');
      if (unitId) {
        data.forEach((lesson) =>
          lesson.units.forEach((unit) => {
            if (unit.id === unitId) {
              setSelectUnit(unit);
              setCurrentLesson((prev) => [...prev, lesson.id]);
            }
          })
        );
      } else {
        setCurrentLesson([data[0].id]);
        setSelectUnit(data[0].units[0]);
      }
    }
  }, [data, isLoading, searchParams]);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className='flex px-5 flex-col space-y-4 overflow-y-scroll h-[calc(100vh-100px)] no-scrollbar'>
        <div className='w-full'>
          <div className='mx-auto'>
            <div>
              <Label className='text-xl font-bold'>
                {!selectUnit ? (
                  <Skeleton className='w-64 h-4' />
                ) : (
                  selectUnit.title ?? 'Unknowns'
                )}
              </Label>
            </div>
            <div className='grid grid-cols-4 gap-2 items-stretch overflow-scroll no-scrollbar mt-5'>
              <div className='col-span-3'>
                {data && selectUnit ? (
                  selectUnit.type === EUnitType.VIDEO ? (
                    <Video selectUnit={selectUnit} />
                  ) : (
                    <Quiz selectUnit={selectUnit} />
                  )
                ) : (
                  <div className='w-full h-96 flex items-center justify-center'>
                    <Spinner />
                  </div>
                )}
              </div>
              <ListUnits
                data={data}
                isLoading={isLoading}
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
                selectUnit={selectUnit}
              />
            </div>
          </div>
        </div>

        <div className='mx-4 flex flex-col space-y-2'>
          <Label className='font-bold text-xl'>Description</Label>
          <div
            dangerouslySetInnerHTML={{
              __html: selectUnit
                ? selectUnit.video
                  ? selectUnit?.video?.description ?? ''
                  : selectUnit?.quizResponse?.description ?? ''
                : '',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CourseVideo;

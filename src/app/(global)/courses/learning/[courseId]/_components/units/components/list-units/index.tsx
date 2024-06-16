import {
  BookOpen,
  ChevronDown,
  Clock,
  PlayCircle,
  StickyNote,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react';

import { cn } from '@/lib/utils';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

import { EUnitType, Lesson, TUnit } from '@/types';

interface IListUnitsProps {
  isLoading: boolean;
  data?: Lesson[];
  currentLesson: string[];
  setCurrentLesson: Dispatch<SetStateAction<string[]>>;
  selectUnit?: TUnit;
}

const ListUnits = ({
  isLoading,
  data,
  currentLesson,
  setCurrentLesson,
  selectUnit,
}: IListUnitsProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

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
    [searchParams, pathName, replace]
  );

  const onSelectUnit = (unit: TUnit) => {
    createQueryString('unitId', unit.id);
  };
  return (
    <div>
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
        <div className='flex flex-col space-y-4'>
          <span className='text-primary-600'>2/5 COMPLETED</span>
          <Progress value={40} className='h-2' />
        </div>
      </CardHeader>
      <CardContent className='p-2 space-y-2 overflow-scroll no-scrollbar'>
        {isLoading
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
          : data?.map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  'duration-150 hover:border-primary-300 border rounded-md',
                  currentLesson.includes(lesson.id) ? 'border-primary-300' : ''
                )}
              >
                <div
                  className={cn(
                    'flex items-center gap-x-2 text-slate-700 p-2 px-4 text-sm cursor-pointer'
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
                  {lesson.units?.map((unit, index) => (
                    <div
                      key={unit.id}
                      className={cn('flex items-center space-x-2 ')}
                      onClick={() => onSelectUnit(unit)}
                    >
                      <div
                        className={cn(
                          'cursor-pointer w-full hover:text-primary-600 duration-500 m-2 p-2 rounded-sm transition',
                          selectUnit?.id === unit.id ? 'text-primary-600' : ''
                        )}
                      >
                        <div className='flex items-center mx-3 justify-between'>
                          <div className='flex flex-col'>
                            <span>
                              {index + 1}.{' '}
                              {unit.type === EUnitType.VIDEO ? 'Video' : 'Quiz'}
                              : {unit.title}
                            </span>
                            <div className='flex items-center text-xs'>
                              {unit.type === EUnitType.VIDEO ? (
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
  );
};

export default memo(ListUnits);

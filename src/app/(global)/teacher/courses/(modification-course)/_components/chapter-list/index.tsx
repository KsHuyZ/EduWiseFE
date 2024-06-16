'use client';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  ChevronDown,
  Download,
  Grip,
  Pen,
  Pencil,
  PlayCircle,
  StickyNote,
  Trash,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import FormQuiz from '@/app/(global)/teacher/courses/__components/form-quiz';
import FormVideo from '@/app/(global)/teacher/courses/__components/form-video';
import DeleteLesson from '@/app/(global)/teacher/courses/(modification-course)/_components/chapter-list/components/delete-lesson';

import { EUnitType, Lesson, TUnit } from '@/types';

interface ChaptersListProps {
  items: Lesson[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  loading?: boolean;
  onSelectLesson: (lesson: Lesson) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  loading,
  onSelectLesson,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapter, setChapter] = useState(items);
  const [currentLesson, setCurrentLesson] = useState<undefined | string>(
    undefined
  );
  const [selectEdit, setSelectEdit] = useState<TUnit | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapter(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapter);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapter(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='chapters'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='duration-150'
          >
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md text-sm mb-1',
                      'bg-sky-100 border-sky-200 text-primary-700'
                    )}
                  >
                    <div
                      className={cn(
                        'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                        'border-r-sky-200 hover:bg-sky-200'
                      )}
                    >
                      <Grip className='h-5 w-5' />
                    </div>
                    <Skeleton className='w-20 h-5' />
                    <div className='ml-auto pr-2 flex items-center gap-x-2'>
                      <Pencil className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                      <Trash className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 cursor-pointer hover:opacity-75 transition'
                        )}
                      />
                    </div>
                  </div>
                ))
              : chapter.map((chapter, index) => (
                  <Draggable
                    key={chapter.id}
                    draggableId={chapter.id}
                    index={index}
                  >
                    {(provided) => (
                      <div className='mb-4 duration-150'>
                        <div
                          className={cn(
                            'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md text-sm mb-1',
                            'bg-sky-100 border-sky-200 text-primary-700'
                          )}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            className={cn(
                              'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                              'border-r-sky-200 hover:bg-sky-200'
                            )}
                            {...provided.dragHandleProps}
                          >
                            <Grip className='h-5 w-5' />
                          </div>
                          {chapter.title}
                          <div className='ml-auto pr-2 flex items-center gap-x-2'>
                            <Pencil
                              onClick={() => onSelectLesson(chapter)}
                              className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
                            />
                            <DeleteLesson lesson={chapter} />
                            <ChevronDown
                              onClick={() =>
                                setCurrentLesson((prev) => {
                                  if (prev) {
                                    return undefined;
                                  }
                                  return chapter.id;
                                })
                              }
                              className={cn(
                                'w-4 h-4 cursor-pointer hover:opacity-75 transition',
                                currentLesson === chapter.id ? 'rotate-180' : ''
                              )}
                            />
                          </div>
                        </div>
                        <div className='flex flex-col align-middle justify-center mx-auto'>
                          <div
                            className={cn(
                              'no-scrollbar duration-700',
                              currentLesson === chapter.id
                                ? 'overflow-y-scroll max-h-[500px]'
                                : 'max-h-0 overflow-hidden'
                            )}
                          >
                            {currentLesson === chapter.id ? (
                              <div className='flex flex-col space-y-8'>
                                <div>
                                  {chapter.units.map((units) => (
                                    <div
                                      key={units.id}
                                      className={cn(
                                        'flex items-center space-x-2 '
                                      )}
                                    >
                                      <div className='cursor-pointer w-full hover:bg-gray-200 m-2 p-2 rounded-sm transition'>
                                        <div className='flex items-center mx-3 justify-between'>
                                          <div className='flex flex-col'>
                                            <span className='text-primary-600'>
                                              {index + 1}: {units.title}
                                            </span>
                                            <div className='flex items-center text-xs'>
                                              {units.type ===
                                              EUnitType.VIDEO ? (
                                                <>
                                                  <PlayCircle
                                                    size={15}
                                                    className='text-gray-500'
                                                  />
                                                  <span className='ml-2'>
                                                    20:00
                                                  </span>
                                                </>
                                              ) : (
                                                <StickyNote
                                                  size={15}
                                                  className='text-gray-500'
                                                />
                                              )}
                                            </div>
                                          </div>
                                          <div className='flex items-center'>
                                            <Button
                                              variant='ghost'
                                              onClick={() =>
                                                setSelectEdit(units)
                                              }
                                            >
                                              <Pen size={15} />
                                            </Button>
                                            <Button variant='ghost'>
                                              <Trash size={15} />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className='flex justify-between items-center'>
                                  <div className='grid grid-cols-2 gap-2'>
                                    <FormVideo
                                      lessonId={currentLesson}
                                      unit={selectEdit}
                                      setUnit={setSelectEdit}
                                    />
                                    <FormQuiz lessonId={currentLesson} />
                                  </div>
                                  <div>
                                    <Button
                                      variant='outline'
                                      leftIcon={Download}
                                    >
                                      Import
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

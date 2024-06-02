'use client';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { ChevronDown, Download, Grip, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import FormQuiz from '@/app/(global)/teacher/courses/__components/form-quiz';
import FormVideo from '@/app/(global)/teacher/courses/__components/form-video';

import { Lesson, Video } from '@/types';

interface ChaptersListProps {
  items: Lesson[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onAddVideo: (id: string, video: Video) => void;
  loading?: boolean;
  onSelectLesson: (lesson: Lesson) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  onAddVideo,
  loading,
  onSelectLesson,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapter, setChapter] = useState(items);
  const [currentLesson, setCurrentLesson] = useState<undefined | string>(
    undefined
  );

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
                            {/* {chapter.isFree && <Badge>Free</Badge>} */}
                            <Pencil
                              onClick={() => onSelectLesson(chapter)}
                              className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
                            />
                            <Trash className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
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
                          {currentLesson === chapter.id ? (
                            <div className='flex flex-col space-y-8'>
                              <div>
                                {/* {chapter.videos.map((video, index) => (
                              <div
                                key={`video_${video.id}`}
                                className='cursor-pointer hover:bg-gray-200 m-2 p-2 rounded-sm transition bg-gray-50'
                              >
                                <div className='flex items-center mx-3 justify-between'>
                                  <div className='flex flex-col'>
                                    <span className='font-bold'>
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
                                  <div className='flex items-center space-x-2'>
                                    <Pencil className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                                    <Trash className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                                  </div>
                                </div>
                              </div>
                            ))} */}
                              </div>
                              <div className='flex justify-between items-center'>
                                <div className='grid grid-cols-2 gap-2'>
                                  <FormVideo
                                    lessonId={currentLesson}
                                    onAddVideo={onAddVideo}
                                  />
                                  <FormQuiz />
                                </div>
                                <div>
                                  <Button variant='outline' leftIcon={Download}>
                                    Import
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : null}
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

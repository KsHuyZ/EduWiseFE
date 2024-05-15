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
  HelpCircle,
  Pencil,
  PlayCircle,
  Plus,
  Trash,
} from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { Badge } from '@/components/ui/badge';

import { Lesson, Video } from '@/types';

interface ChaptersListProps {
  items: Lesson[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  form: UseFormReturn<
    {
      title: string;
    },
    any,
    undefined
  >;
  setChangeChapter: Dispatch<
    SetStateAction<{
      show: boolean;
      form: Video | undefined;
      id: string | undefined;
    }>
  >;
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
  form,
  setChangeChapter,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapter, setChapter] = useState(items);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<undefined | string>(
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

  // const onSubmit = (values: { id: string; title: string }) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='chapters'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapter.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div className='mb-4'>
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
                        {chapter.isFree && <Badge>Free</Badge>}
                        <Pencil
                          onClick={() => setIsUpdate(true)}
                          className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
                        />
                        <Trash className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                        <ChevronDown
                          onClick={() =>
                            setCurrentChapter((prev) => {
                              if (prev) {
                                return undefined;
                              }
                              return chapter.id;
                            })
                          }
                          className={cn(
                            'w-4 h-4 cursor-pointer hover:opacity-75 transition',
                            currentChapter === chapter.id ? 'rotate-180' : ''
                          )}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col align-middle justify-center mx-auto'>
                      {currentChapter === chapter.id ? (
                        <div className='flex flex-col space-y-8'>
                          <div>
                            {chapter.videos.map((video, index) => (
                              <div
                                key={`video_${video.id}`}
                                className='cursor-pointer hover:bg-gray-200 p-2 px-1 rounded-sm transition'
                              >
                                <div className='flex items-center mx-3 justify-between'>
                                  <div className='flex flex-col'>
                                    <span className='font-bold'>
                                      {index + 1}. {video.title}
                                    </span>
                                    <div className='flex items-center text-xs'>
                                      <PlayCircle size={15} />{' '}
                                      <span className='ml-2'>20:00</span>
                                    </div>
                                  </div>
                                  <div className='flex items-center space-x-2'>
                                    <HelpCircle className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                                    <Pencil
                                      className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
                                      onClick={() =>
                                        setChangeChapter({
                                          show: true,
                                          form: video,
                                          id: video.id,
                                        })
                                      }
                                    />
                                    <Trash className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className='flex justify-between items-center'>
                            <div className='grid grid-cols-2 gap-2'>
                              <Button leftIcon={Plus} variant='outline'>
                                Lesson
                              </Button>
                              <Button leftIcon={Plus} variant='outline'>
                                Quiz
                              </Button>
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

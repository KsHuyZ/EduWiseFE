'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { cn } from '@/lib/utils';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { ChaptersList } from '@/app/(global)/teacher/courses/__components/chapter-list';
import {
  useLessons,
  useModificationLesson,
} from '@/app/(global)/teacher/courses/(modification-course)/create/_hook';
import { validateError } from '@/utils';

import { Lesson, Video } from '@/types';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Lesson name must be at least 2 characters.',
    })
    .trim(),
  content: z.string().min(2, {
    message: 'Lesson content must be at least 2 characters.',
  }),
});

interface ChaptersFormProps {
  idCourse?: string;
}

export const ChaptersForm = ({ idCourse }: ChaptersFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>();
  const { data: lessons, isLoading, isError, error } = useLessons(idCourse);
  const { isPending, mutateAsync: modificationLesson } = useModificationLesson(
    idCourse!,
    currentLesson?.id
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => {
    toast.error(validateError(error));
  }, [isError]);

  const onAddVideo = (id: string, video: Video) => {
    console.log(id, video);
  };

  const onSelectLesson = (lesson: Lesson) => {
    setOpen(true);
    setCurrentLesson(lesson);
    form.reset(lesson);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (idCourse) {
      const lessonValues = currentLesson
        ? { ...values, id: currentLesson.id }
        : { ...values, idCourse };
      await modificationLesson(lessonValues);
      toast.success(`Chapter ${currentLesson ? 'updated' : 'created'}!`);
      setOpen(false);
      setCurrentLesson(undefined);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      toast.success('Chapters reordered');
      // router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add chapter</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson content</FormLabel>
                    <FormControl>
                      <Input placeholder='Lesson content' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' isLoading={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className='relative p-4'>
        {isUpdating && (
          <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
            <Loader2 className='animate-spin h-6 w-6 text-sky-700' />
          </div>
        )}
        <div className='font-medium flex items-center justify-between'>
          Course chapters
        </div>
        <div className={cn('text-sm mt-2', 'text-slate-500')}>
          <ChaptersList
            loading={isLoading}
            onReorder={onReorder}
            items={lessons ?? []}
            onAddVideo={onAddVideo}
            onSelectLesson={onSelectLesson}
          />
        </div>
      </div>
      <Button leftIcon={Plus} onClick={() => setOpen(true)}>
        Add Chapter
      </Button>
    </>
  );
};

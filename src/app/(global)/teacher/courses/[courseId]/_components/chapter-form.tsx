'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { ChaptersList } from '@/app/(global)/teacher/courses/[courseId]/_components/chapter-list';

import { Lesson, Video } from '@/types';

interface ChaptersFormProps {
  courseId: string;
  setChangeChapter: Dispatch<
    SetStateAction<{
      show: boolean;
      form: Video | undefined;
      id: string | undefined;
    }>
  >;
  chapters: Lesson[];
  setChapters: Dispatch<SetStateAction<Lesson[]>>;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({
  courseId,
  setChangeChapter,
  chapters,
  setChapters,
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          setChapters((prev) => [
            ...prev,
            { ...values, id: Math.random().toString(), courseId, videos: [] },
          ]);
          resolve(true);
        }, 1000);
      });
      toast.success('Chapter created');
      toggleCreating();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      toast.success('Chapters reordered');
      // router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    // setCurrentLesson(id)
  };

  return (
    <>
      <div className='relative mt-6 border rounded-md p-4 shadow-md'>
        {isUpdating && (
          <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
            <Loader2 className='animate-spin h-6 w-6 text-sky-700' />
          </div>
        )}
        <div className='font-medium flex items-center justify-between'>
          Course chapters
          {/* <Button onClick={toggleCreating} variant='ghost'>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a chapter
            </>
          )}
        </Button> */}
        </div>
        <div className={cn('text-sm mt-2', 'text-slate-500')}>
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={chapters}
            setChangeChapter={setChangeChapter}
            form={form}
          />
        </div>
        <p className='text-xs text-muted-foreground mt-4'>
          Drag and drop to reorder the chapters
        </p>
        {isCreating && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-4'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Introduction to the course'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
                type='submit'
              >
                Create
              </Button>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};

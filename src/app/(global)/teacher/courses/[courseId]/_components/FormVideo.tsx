'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import Tiptap from '@/components/inputs/Tiptap';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import VideoUploader from '@/app/(global)/teacher/courses/[courseId]/_components/upload-video';
import { validateError } from '@/utils';

import { Lesson, Video } from '@/types';

const defaultValues = {
  name: '',
  description: '',
  file: null,
};

const ACCEPTED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
];

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  file: z.any().refine((file) => {
    return ACCEPTED_VIDEO_TYPES.includes(file?.type);
  }, 'Only .mp4, .webm formats are supported.'),
});

interface FormVideoProps {
  chapter: {
    show: boolean;
    form: Video | undefined;
    id: string | undefined;
  };
  setChangeChapter: Dispatch<
    SetStateAction<{
      show: boolean;
      form: Video | undefined;
      id: string | undefined;
    }>
  >;
  setChapters: Dispatch<SetStateAction<Lesson[]>>;
}

const FormVideo = ({
  chapter,
  setChangeChapter,
  setChapters,
}: FormVideoProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (values: Video) => {
    setChapters((prev) => {
      const chapters = [...prev];
      return chapters.map((chap) => {
        if (chap.id === chapter.id) {
          return { ...chap, videos: [...chap.videos, values] };
        }
        return chap;
      });
    });
    try {
      toast.success('Create course success!');
      setChangeChapter({ id: undefined, form: undefined, show: false });
    } catch (error) {
      toast.error(validateError(error));
    }
  };

  useEffect(() => {
    if (chapter.form) {
      form.reset(chapter.form);
    }
  }, [chapter.form]);

  return (
    <div className='flex p-6 mx-auto'>
      <div className='w-full'>
        <h1 className='text-2xl'>Course setup</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem>
                  <FormLabel>Video</FormLabel>
                  <FormControl>
                    <VideoUploader
                      onChange={(e) =>
                        form.setValue(
                          'file',
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Eg: Introdution' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <div className='flex justify-end'>
                <Button
                  variant='outline'
                  onClick={() =>
                    setChangeChapter({
                      show: false,
                      form: undefined,
                      id: undefined,
                    })
                  }
                >
                  Cancel
                </Button>
                <Button type='submit' className='ml-3'>
                  Submit
                </Button>
              </div>
            </FormItem>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormVideo;

'use client';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useCreateVideo } from '@/app/(global)/teacher/courses/_hooks';
import VideoUploader from '@/app/(global)/teacher/courses/[courseId]/_components/upload-video';
import { createVideoSchema } from '@/validator';

import { Video } from '@/types';

const CustomEditor = dynamic(
  () => {
    return import('@/components/inputs/CustomEditor');
  },
  { ssr: false }
);

interface IFormProps {
  onAddVideo: (id: string, video: Video) => void;
  lessonId?: string;
}

const FormVideo = ({ onAddVideo, lessonId }: IFormProps) => {
  const form = useForm<z.infer<typeof createVideoSchema>>({
    resolver: zodResolver(createVideoSchema),
  });
  const [open, setOpen] = useState(false);
  const { mutateAsync: createVideo, isPending } = useCreateVideo();

  const onSubmit = async () => {
    const values = form.getValues();
    if (lessonId && values.file) {
      await createVideo({ ...values, idLesson: lessonId });
      setOpen(false);
    }
  };

  const onEditorChange = (_: unknown, editor: ClassicEditor) => {
    form.setValue('description', editor.getData());
  };

  return (
    <>
      <Button leftIcon={Plus} variant='outline' onClick={() => setOpen(true)}>
        Lesson
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Lesson</DialogTitle>
          </DialogHeader>
          <div className='overflow-y-scroll no-scrollbar'>
            <div className='w-full'>
              <Form {...form}>
                <form className='space-y-2'>
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
                          <CustomEditor
                            value={field.value}
                            onChange={onEditorChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name='preview'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center space-x-2'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Enable Course Preview</FormLabel>
                        </div>
                        <FormDescription className='flex items-center space-x-2'>
                          <AlertCircle className='w-5 h-5' />{' '}
                          <span>
                            If checked, any users/guest can view this lesson
                            without enroll course
                          </span>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' isLoading={isPending} onClick={onSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormVideo;

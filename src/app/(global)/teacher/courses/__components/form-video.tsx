'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import Tiptap from '@/components/inputs/Tiptap';
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

import VideoUploader from '@/app/(global)/teacher/courses/[courseId]/_components/upload-video';
import { validateError } from '@/utils';

import { Video } from '@/types';

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
  preview: z.boolean().default(false),
});

interface IFormProps {
  onAddVideo: (id: string, video: Video) => void;
  lessonId?: string;
}

const FormVideo = ({ onAddVideo, lessonId }: IFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [open, setOpen] = useState(false);

  const onSubmit = (values: z.infer<typeof schema>) => {
    try {
      if (lessonId) {
        onAddVideo(lessonId, {
          ...values,
          id: Math.random().toString(),
          videoUrl: '',
          type: 'video',
        });
        toast.success('Create course success!');
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error(validateError(error));
    }
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
          <div className='h-[400px] overflow-y-scroll no-scrollbar'>
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
                          <Tiptap {...field} value={field.value} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
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
                  />
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormVideo;

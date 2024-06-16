'use client';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import VideoUploader from '@/app/(global)/teacher/courses/__components/form-video/components/video-uploader';
import { useCreateVideo } from '@/app/(global)/teacher/courses/_hooks';
import { createVideoSchema } from '@/validator';

import { TUnit } from '@/types';

const CustomEditor = dynamic(
  () => {
    return import('@/components/inputs/CustomEditor');
  },
  { ssr: false }
);

interface IFormProps {
  lessonId?: string;
  unit?: TUnit;
  setUnit: Dispatch<SetStateAction<TUnit | undefined>>;
}

const FormVideo = ({ lessonId, unit, setUnit }: IFormProps) => {
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
      setUnit(undefined);
    }
  };

  const onEditorChange = (_: unknown, editor: ClassicEditor) => {
    form.setValue('description', editor.getData());
  };

  useEffect(() => {
    if (unit) {
      setOpen(true);
      form.reset(unit);
      form.setValue('file', unit.video?.url);
    }
  }, [setOpen, form, unit]);

  const onClose = useCallback(
    (value: boolean) => {
      if (!value && isPending) {
        return;
      }
      if (!value) {
        form.reset({
          title: '',
          description: '',
          file: undefined,
          preview: false,
        });
        setUnit(undefined);
      }
      setOpen(value);
    },
    [setOpen, form, isPending, setUnit]
  );

  return (
    <>
      <Button leftIcon={Plus} variant='outline' onClick={() => setOpen(true)}>
        Lesson
      </Button>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='min-w-[1000px]'>
          <DialogHeader>
            <DialogTitle>{unit ? 'Edit' : 'Create'} Lesson</DialogTitle>
          </DialogHeader>
          <div className='overflow-y-scroll no-scrollbar'>
            <div className='w-full'>
              <Form {...form}>
                <form>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='file'
                      render={({ field }) => (
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
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex flex-col space-y-2'>
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
                    </div>
                  </div>
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

'use client';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { z } from 'zod';

import { useDebounce } from '@/hooks';

import ImageUploader from '@/components/inputs/ImageUpload';
import Input from '@/components/inputs/Input';
import { Select as MultipleSelect } from '@/components/inputs/MultipleSelect';
import Spinner from '@/components/loading/spinner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

import { useCourseForm } from '@/app/(global)/teacher/courses/(modification-course)/_provider';
import {
  useCategory,
  useModificationCourse,
  useTag,
} from '@/app/(global)/teacher/courses/(modification-course)/create/_hook';
import { levelOptions } from '@/constant';
import { validateError } from '@/utils';
import { courseInfoSchema } from '@/validator';

const CustomEditor = dynamic(
  () => {
    return import('@/components/inputs/CustomEditor');
  },
  { ssr: false }
);

const CreateForm = () => {
  const { id } = useParams<{ id: string }>();
  const [inputTagValue, setInputTagValue] = useState('');
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const debouncedTagInput = useDebounce(inputTagValue, 500);
  const debouncedCategoryInput = useDebounce(inputCategoryValue, 500);
  const { data: tags, isLoading: tagLoading } = useTag(debouncedTagInput);
  const { data: categories, isLoading: categoryLoading } = useCategory(
    debouncedCategoryInput
  );
  const { toast } = useToast();
  const { isPending, mutateAsync: modificationCourse } =
    useModificationCourse(id);
  const router = useRouter();
  const { formInfo, courseLoading, course } = useCourseForm();
  const [isPay, setIsPay] = useState(false);
  const onSubmit = async (values: z.infer<typeof courseInfoSchema>) => {
    try {
      const result = await modificationCourse({ ...values, id });
      router.push(`/teacher/courses/edit/lesson/${result.id}`);
      toast({
        title: `${id ? 'Update' : 'Create'} course success!`,
        variant: 'success',
      });
    } catch (error) {
      toast({ title: validateError(error), variant: 'destructive' });
    }
  };

  const handleEditorChange = (_: unknown, editor: ClassicEditor) => {
    formInfo.setValue('description', editor.getData());
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formInfo.setValue('file', file);
    }
  };
  const onClearImage = () => {
    formInfo.setValue('file', null);
  };

  useEffect(() => {
    if (course) {
      if (course.price > 0) {
        setIsPay(true);
      }
    }
  }, [course]);

  return (
    <div className='relative'>
      {courseLoading && (
        <div className='absolute w-full h-full bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center'>
          <Spinner />
        </div>
      )}
      <Form {...formInfo}>
        <form
          className='py-3 space-y-4 overflow-y-scroll h-[350px]'
          onSubmit={formInfo.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 space-y-2 gap-1 lg:grid-cols-2 lg:gap-3 lg:space-y-0'>
            <FormField
              control={formInfo.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Course Title <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 'Advanced web development"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formInfo.control}
              name='level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Level <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select level' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Level</SelectLabel>
                          {levelOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 space-y-2 gap-1 lg:grid-cols-2 lg:gap-3 lg:space-y-0'>
            <FormField
              control={formInfo.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tags <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <MultipleSelect
                      values={field.value}
                      value={inputTagValue}
                      setInput={setInputTagValue}
                      options={[
                        ...(tags ?? []),
                        {
                          id: Math.random().toString(),
                          name: debouncedTagInput,
                        },
                      ]}
                      onChange={(value) => formInfo.setValue('tags', value)}
                      loading={tagLoading}
                      placeholder='Eg: React, Nextjs,...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formInfo.control}
              name='categories'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Categories <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <MultipleSelect
                      values={field.value}
                      value={inputCategoryValue}
                      setInput={setInputCategoryValue}
                      options={[
                        ...(categories ?? []),
                        {
                          id: Math.random().toString(),
                          name: debouncedCategoryInput,
                        },
                      ]}
                      onChange={(value) =>
                        formInfo.setValue('categories', value)
                      }
                      loading={categoryLoading}
                      placeholder='Eg: Frontend, Backend,...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col space-y-4'>
            <Label>
              Course price <span className='text-red-600'>*</span>
            </Label>
            <div className='flex space-x-3'>
              <div className='flex space-x-3'>
                <Checkbox
                  id='free'
                  checked={!isPay}
                  onClick={() => {
                    setIsPay(!isPay);
                    formInfo.setValue('price', 0);
                  }}
                />
                <Label>Free</Label>
              </div>
              <div className='flex space-x-3'>
                <Checkbox
                  id='paid'
                  checked={isPay}
                  onClick={() => setIsPay(!isPay)}
                />
                <Label>Paid</Label>
              </div>
            </div>
          </div>
          {isPay ? (
            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={formInfo.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price <span className='text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='9đ'
                        type='number'
                        {...field}
                        onChange={(e) =>
                          formInfo.setValue('price', Number(e.target.value))
                        }
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formInfo.control}
                name='discount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='9đ'
                        type='number'
                        {...field}
                        onChange={(e) =>
                          formInfo.setValue('discount', Number(e.target.value))
                        }
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}

          <FormField
            control={formInfo.control}
            name='descriptionShort'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Short description'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-full'>
            <FormField
              control={formInfo.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    About course <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <CustomEditor
                      value={field.value}
                      onChange={handleEditorChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={formInfo.control}
            name='file'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Image <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <ImageUploader
                    name='file'
                    onChange={handleImageChange}
                    onClear={onClearImage}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center justify-end gap-x-2 pt-4'>
            <Button type='submit' isLoading={isPending}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;

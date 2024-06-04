'use client';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDebounce } from '@/hooks';

import ImageUploader from '@/components/inputs/ImageUpload';
import Input from '@/components/inputs/Input';
import { Select as MultipleSelect } from '@/components/inputs/MultipleSelect';
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
import { useToast } from '@/components/ui/use-toast';

import {
  useCategory,
  useCreateCourse,
  useTag,
} from '@/app/(global)/teacher/courses/(modification-course)/create/_hook';
import { useCourseInfo } from '@/app/(global)/teacher/courses/(modification-course)/edit/info/[id]/hooks';
import { courseInitialValues, levelOptions } from '@/constant';
import { validateError } from '@/utils';
import { courseInfoSchema } from '@/validator';

const CustomEditor = dynamic(
  () => {
    return import('@/components/inputs/CustomEditor');
  },
  { ssr: false }
);

const CreateForm = () => {
  const { id } = useParams();
  const [inputTagValue, setInputTagValue] = useState('');
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const [isPay, setIsPay] = useState(false);
  const debouncedTagInput = useDebounce(inputTagValue, 500);
  const debouncedCategoryInput = useDebounce(inputCategoryValue, 500);
  const { data: tags, isLoading: tagLoading } = useTag(debouncedTagInput);
  const { data: categories, isLoading: categoryLoading } = useCategory(
    debouncedCategoryInput
  );
  const { toast } = useToast();
  const { isPending, mutateAsync: createCourse } = useCreateCourse();
  const router = useRouter();
  const form = useForm<z.infer<typeof courseInfoSchema>>({
    resolver: zodResolver(courseInfoSchema),
    defaultValues: courseInitialValues,
  });
  const { data } = useCourseInfo(id as string);

  const onSubmit = async (values: z.infer<typeof courseInfoSchema>) => {
    try {
      const result = await createCourse(values);
      router.push(`/teacher/courses/edit/lesson/${result.id}`);
      toast({ title: 'Create course success!', variant: 'success' });
    } catch (error) {
      toast({ title: validateError(error), variant: 'destructive' });
    }
  };

  const handleEditorChange = (_: unknown, editor: ClassicEditor) => {
    form.setValue('description', editor.getData());
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      form.setValue('file', file);
    }
  };
  const onClearImage = () => {
    form.setValue('file', null);
  };

  useEffect(() => {
    if (id && data) {
      const { file, name, price, description, tags, categories } = data;
      form.reset({
        name,
        price,
        description,
        tags,
        categories,
      });
      form.setValue('file', file.url);
      if (price > 0) {
        setIsPay(true);
      }
    }
  }, [id, data]);

  return (
    <div className=''>
      <Form {...form}>
        <form
          className='py-3 space-y-4 overflow-y-scroll h-[350px]'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 space-y-2 gap-1 lg:grid-cols-2 lg:gap-3 lg:space-y-0'>
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
                      onChange={(value) => form.setValue('tags', value)}
                      loading={tagLoading}
                      placeholder='Eg: React, Nextjs,...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
                      onChange={(value) => form.setValue('categories', value)}
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
                  onClick={() => setIsPay(!isPay)}
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
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price <span className='text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        leftIcon={DollarSign}
                        placeholder='9$'
                        type='number'
                        {...field}
                        onChange={(e) =>
                          form.setValue('price', Number(e.target.value))
                        }
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='discount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        leftIcon={DollarSign}
                        placeholder='9$'
                        type='number'
                        {...field}
                        onChange={(e) =>
                          form.setValue('discount', Number(e.target.value))
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

          <div className='w-full'>
            <FormField
              control={form.control}
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
            control={form.control}
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

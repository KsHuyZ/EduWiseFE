'use client';
import { useFormik } from 'formik';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';

interface TitleFormProps {
  initialData?: {
    title: string;
  };
  courseId?: string;
}

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  // const form = useFormik()
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: any) => {
    try {
      // await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course title
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className='text-sm mt-2'>{/* {initialData.title} */}</p>
      )}
      {isEditing && (
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-4'
        >
          <Input placeholder="e.g. 'Advanced web development'" />
          <div className='flex items-center gap-x-2'>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TitleForm;

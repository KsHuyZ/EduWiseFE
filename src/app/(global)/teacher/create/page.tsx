'use client';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import Button from '@/components/buttons/Button';
import CustomEditor from '@/components/inputs/CustomEditor';
import ImageUploader from '@/components/inputs/ImageUpload';
import Input from '@/components/inputs/Input';

import { createCourse } from '@/app/(global)/teacher/create/api/createCourse';

const { object, string } = Yup;

interface CourseValues {
  title: string;
  description: string;
}

const initialValues: CourseValues = {
  title: '',
  description: '',
};

const validationSchema = object({
  title: string()
    .min(2, 'Course minimun 2 characters')
    .max(15, 'Course maximun 15 characters')
    .required('Course title is required'),
  description: string()
    .min(2, 'Description minimum 2 character')
    .required('Course title is required'),
});

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: CourseValues) => {
    try {
      setLoading(true);
      const result = await createCourse(values.title);
      toast.success('Create course success');
      router.push(`/teacher/courses/${result}`);
    } catch (error) {
      toast.error(error as string);
    }
    setLoading(false);
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  const handleEditorChange = (_: any, editor: ClassicEditor) => {
    formik.setFieldValue('description', editor.getData());
  };

  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
      <div>
        <h1 className='text-2xl'>Course setup</h1>
        <form className='py-3 space-y-4' onSubmit={formik.handleSubmit}>
          <Input
            label='Course title'
            placeholder="e.g. 'Advanced web development"
            type='text'
            value={formik.values.title}
            name='title'
            onChange={formik.handleChange}
            error={formik.errors.title}
            disabled={loading}
          />
          <CustomEditor
            label='Description'
            value={formik.values.description}
            onChange={handleEditorChange}
          />
          <ImageUploader />
          <div className='flex items-center gap-x-2 pt-4'>
            <Link href='/'>
              <Button type='button' variant='ghost'>
                Cancel
              </Button>
            </Link>
            <Button type='submit' isLoading={loading}>
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;

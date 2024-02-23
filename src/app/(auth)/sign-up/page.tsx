'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import NextImage from '@/components/NextImage';
import RegisterForm from '@/components/register-form';

import signUp from '@/app/(auth)/sign-up/api/signUp';
import { UserCredentials } from '@/app/(auth)/sign-up/types/usercredential';
import { validatError } from '@/utils';

const { object, string } = Yup;

const validationSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().email('Invalid email format').required('Email is required'),
  password: string().required('Password is required'),
  passwordConfirm: string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Password confirm is required'),
});

const initialValues: UserCredentials = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: UserCredentials) => {
    try {
      setLoading(true);
      await signUp(values);
      toast.success('Sign In success');
      router.replace('/sign-in');
    } catch (error: any) {
      if (validatError(error)) {
        toast.error(validatError(error));
        const { email, firstName, lastName, password, passwordConfirm } =
          error.items as UserCredentials;
        if (email) {
          formik.setFieldError('email', email);
        }
        if (firstName) {
          formik.setFieldError('firstName', firstName);
        }
        if (lastName) {
          formik.setFieldError('lastName', lastName);
        }
        if (password) {
          formik.setFieldError('password', password);
        }
        if (passwordConfirm) {
          formik.setFieldError('passwordConfirm', passwordConfirm);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
    validateOnChange: false,
  });

  return (
    <div className='bg-gray-50 dark:bg-gray-900 h-full'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
        <Link
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <NextImage
            className='w-8 h-8 mr-2'
            src='/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
          />
          EduWise
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign up
            </h1>
            <RegisterForm formik={formik} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { setCookies } from '@/lib/action';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';

import { signIn } from '@/app/(auth)/sign-in/api';
import { UserCredentials } from '@/app/(auth)/sign-in/types';
import { validateError } from '@/utils';

const { object, string, boolean } = Yup;

const initialValues: UserCredentials = {
  email: '',
  password: '',
  rememberMe: false,
};

const validationSchema = object({
  email: string().email('Invalid email format').required('Email is required'),
  password: string().required('Password is required'),
  rememberMe: boolean(),
});

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: UserCredentials) => {
    try {
      setLoading(true);
      const result = await signIn(values);
      const { token, refreshToken, userResponse } = result;
      await setCookies('user', userResponse);
      await setCookies('token', { token, refreshToken });
      toast.success('Login Success');
      router.replace('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(validateError(error));
      if (error && error.data) {
        const items = error.data.items as UserCredentials;
        if (items?.email) {
          formik.setFieldError('email', items?.email);
        }
        if (items?.password) {
          formik.setFieldError('password', items?.password);
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
    <form className='space-y-4 md:space-y-6' onSubmit={formik.handleSubmit}>
      <Input
        htmlFor='email'
        label='Your email'
        type='email'
        name='email'
        placeholder='name@company.com'
        required
        value={formik.values.email}
        error={formik.errors.email}
        onChange={formik.handleChange}
      />
      <Input
        htmlFor='password'
        label='Password'
        type='password'
        name='password'
        placeholder='••••••••'
        required
        value={formik.values.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
      />
      <div className='flex items-center justify-between'>
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              aria-describedby='remember'
              type='checkbox'
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
              name='rememberMe'
              onChange={formik.handleChange}
              // {formik.values.rememberMe ? checked : false}
            />
          </div>
          <div className='ml-3 text-sm'>
            <label
              htmlFor='remember'
              className='text-gray-500 dark:text-gray-300'
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href='#'
          className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
        >
          Forgot password?
        </a>
      </div>
      <Button
        type='submit'
        variant='primary'
        className='block w-full text-center'
        isLoading={loading}
      >
        Sign in
      </Button>
      <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
        Don’t have an account yet?{' '}
        <Link
          href='/sign-up'
          className='font-medium text-primary-600 hover:underline dark:text-primary-500'
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;

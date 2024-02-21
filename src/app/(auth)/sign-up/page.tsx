'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import NextImage from '@/components/NextImage';

import signUp from '@/app/(auth)/sign-up/api/signUp';
import { UserCredentials } from '@/app/(auth)/sign-up/types/usercredential';
import { validatError } from '@/utils';

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

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

const initialValues: FormType = {
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
    <div className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 my-6 py-8 mx-auto lg:py-0'>
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
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={formik.handleSubmit}
            >
              <Input
                placeholder='name@name.com'
                label='Email'
                type='email'
                name='email'
                required
                value={formik.values.email}
                error={formik.errors.email}
                onChange={formik.handleChange}
              />
              <Input
                placeholder='Huy'
                label='First Name'
                name='firstName'
                required
                value={formik.values.firstName}
                error={formik.errors.firstName}
                onChange={formik.handleChange}
              />
              <Input
                placeholder='Phan'
                label='Last Name'
                name='lastName'
                required
                value={formik.values.lastName}
                error={formik.errors.lastName}
                onChange={formik.handleChange}
              />
              <Input
                placeholder='••••••••'
                label='Password'
                type='password'
                name='password'
                required
                value={formik.values.password}
                error={formik.errors.password}
                onChange={formik.handleChange}
              />
              <Input
                placeholder='••••••••'
                label='Password Confirm'
                type='password'
                name='passwordConfirm'
                required
                value={formik.values.passwordConfirm}
                error={formik.errors.passwordConfirm}
                onChange={formik.handleChange}
              />
              <Button
                type='submit'
                variant='primary'
                className='block w-full text-center'
                isLoading={loading}
              >
                Sign in
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have account?{' '}
                <Link
                  href='/sign-in'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

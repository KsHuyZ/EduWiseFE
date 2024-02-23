import { FormikProps } from 'formik';
import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';

import { UserCredentials } from '@/app/(auth)/sign-up/types/usercredential';

const RegisterForm = ({
  formik,
  loading,
}: {
  formik: FormikProps<UserCredentials>;
  loading: boolean;
}) => {
  return (
    <form className='space-y-4 md:space-y-6' onSubmit={formik.handleSubmit}>
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
  );
};

export default RegisterForm;

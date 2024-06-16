'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { setCookies } from '@/lib/action';

import Input from '@/components/inputs/Input';
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

import { useSignIn } from '@/app/(auth)/sign-in/_hooks';
import { signInSchema } from '@/validator';

import { TSignInCredentials } from '@/types';

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync: signIn, isPending, error } = useSignIn();

  const form = useForm<TSignInCredentials>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: TSignInCredentials) => {
    const result = await signIn(values);
    const { token, refreshToken, userResponse } = result;
    await setCookies('user', userResponse);
    await setCookies('token', { token, refreshToken });
    router.replace(`/`);
  };

  useEffect(() => {
    const errorData = error as unknown as null | {
      data: {
        items: TSignInCredentials;
      };
    };
    if (errorData && errorData.data) {
      const items = errorData.data.items;
      if (items?.email) {
        form.setError('email', { message: items?.email });
      }
      if (items?.password) {
        form.setError('password', { message: items?.password });
      }
    }
  }, [error, form]);

  return (
    <Form {...form}>
      <form
        className='space-y-4 md:space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='name@name.com'
                  type='email'
                  required
                  error={form.formState.errors.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='••••••••'
                  type='password'
                  required
                  error={form.formState.errors.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rememberMe'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full text-center'
          isLoading={isPending}
        >
          Sign in
        </Button>
        <a
          href='#'
          className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
        >
          Forgot password?
        </a>
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
    </Form>
  );
};

export default SignInForm;

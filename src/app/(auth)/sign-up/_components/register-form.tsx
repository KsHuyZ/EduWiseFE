'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import { useSignUp } from '@/app/(auth)/sign-up/_hooks';
import { signUpSchema } from '@/validator';

import { TSignUpCredentials } from '@/types';

interface IRegisterForm {
  type: string;
  goBack: () => void;
}

const RegisterForm = ({ type, goBack }: IRegisterForm) => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: signUp, isPending } = useSignUp(type);

  const onSubmit = async (values: TSignUpCredentials) => {
    await signUp(values);
    toast({
      title: 'Sign Up Success',
      description: 'You are sign up success!',
      variant: 'success',
    });
    router.replace('/sign-in');
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder='Huy' required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Phan' required {...field} />
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='••••••••'
                  type='password'
                  name='passwordConfirm'
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <Button onClick={goBack} variant='outline'>
            Cancel
          </Button>
          <Button type='submit' isLoading={isPending}>
            Submit
          </Button>
        </div>
      </form>
      <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
        Already have account?{' '}
        <Link
          href='/sign-in'
          className='font-medium text-primary-600 hover:underline dark:text-primary-500'
        >
          Sign in
        </Link>
      </p>
      ;
    </Form>
  );
};

export default RegisterForm;

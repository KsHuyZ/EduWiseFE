import Link from 'next/link';
import React from 'react';

import SignInForm from '@/app/(auth)/sign-in/components/SignInForm';

const SignIn = () => {
  return (
    <div className='dark:bg-gray-900 rounded overflow-hidden'>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col w-full lg:w-1/2 justify-center px-6 py-8 md:h-screen lg:py-0'>
          <Link
            href='#'
            className='flex justify-center lg:justify-start items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white'
          >
            <img className='w-8 h-8 mr-2' src='/images/logo.svg' alt='logo' />
            <span>Eduwise</span>
          </Link>
          <div className='flex justify-center items-center'>
            <div className='w-full dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Sign in to your account
                </h1>
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 h-screen hidden lg:block bg-primary-600 rounded-lg overflow-hidden'>
          <div className='flex flex-col items-center justify-center h-full'>
            <img
              src='/images/illustration_dashboard.png'
              alt='Placeholder Image'
              className='object-cover '
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

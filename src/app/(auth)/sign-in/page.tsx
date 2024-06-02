import React from 'react';

import SignInForm from '@/app/(auth)/sign-in/components/SignInForm';

const SignIn = () => {
  return (
    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
        Sign in to your account
      </h1>
      <SignInForm />
    </div>
  );
};

export default SignIn;

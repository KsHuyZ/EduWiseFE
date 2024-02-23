'use client';

import { useFormik } from 'formik';
import { LogInIcon, LogOutIcon, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { deleteCookie } from '@/lib/action';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import RegisterForm from '@/components/register-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import signOut from '@/api/signOut';
import { UserCredentials } from '@/app/(auth)/sign-up/types/usercredential';
import { generateNameColor, validatError } from '@/utils';

import { UserType } from '@/types';

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

const NavbarRoutes = ({ user }: { user?: UserType }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isCoursePage = pathname?.startsWith('/courses');
  const isSearchPage = pathname === '/search';

  const onSubmit = async (values: UserCredentials) => {
    try {
      setLoading(true);
      // await signUp(values);
      toast.success('Sign up success');
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
  const handleSignOut = async () => {
    await signOut();
    router.replace('/sign-in');
    await deleteCookie('user');
    await deleteCookie('token');
  };

  return (
    <div className='ml-auto flex gap-x-2'>
      {/* {isTeacherPage || isCoursePage ? (
        <Link href='/'>
          <Button variant='ghost'>
            <LogOut className='mr-2 h-4 w-4' />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href='/teacher/courses'>
          <Button variant='ghost'>Teacher mode</Button>
        </Link>
      )} */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className='flex h-8 w-8 items-center justify-center rounded-full text-white'
              style={{
                background: generateNameColor(
                  cn(user.firstName, user.lastName)
                ),
              }}
            >
              {cn(user.firstName, user.lastName).charAt(0)}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toast.error('This function is not availble')}
            >
              <div className='gap-x-2 flex items-center'>
                <Settings size={15} />
                <span>Setting</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <div className='gap-x-2 flex items-center'>
                <LogOutIcon size={15} />
                <span>Log out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost'>Become EduWise Teacher</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Sign up with Teacher</DialogTitle>
              </DialogHeader>
              <RegisterForm loading={loading} formik={formik} />
            </DialogContent>
          </Dialog>
          <Button
            variant='light'
            leftIcon={LogInIcon}
            onClick={() => router.push('/sign-in')}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default NavbarRoutes;

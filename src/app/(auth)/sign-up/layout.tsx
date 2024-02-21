import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign Up page',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

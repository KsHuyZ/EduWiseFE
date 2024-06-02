// In Next.js, this file would be called: app/providers.jsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

import { useThemeStore } from '@/hooks/useThemeColor';
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      })
  );
  const { theme } = useThemeStore();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.documentElement;
      const removeClasses = Array.from(element.classList).filter((className) =>
        className.startsWith('theme')
      );
      removeClasses.forEach((className) => element.classList.remove(className));
      element.classList.add(theme);
    }
  }, [theme]);
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

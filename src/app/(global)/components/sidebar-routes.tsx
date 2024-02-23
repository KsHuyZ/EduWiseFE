'use client';
import { BarChart, Compass, Layout, List, LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarItem from '@/app/(global)/components/sidebar-item';

interface GuestRoutes {
  icon: LucideIcon;
  label: string;
  href: string;
}

const guestRoutes: GuestRoutes[] = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const teacherRoutes: GuestRoutes[] = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher');
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className='flex flex-col w-full'>
      {routes.map(({ href, icon, label }) => (
        <SidebarItem key={href} href={href} icon={icon} label={label} />
      ))}
    </div>
  );
};

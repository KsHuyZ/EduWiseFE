'use client';
import {
  BarChart,
  Clock,
  Compass,
  GraduationCap,
  Layout,
  LayoutDashboard,
  LucideIcon,
  MessageCircleMore,
  ShoppingCart,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarItem from '@/app/(global)/components/sidebar/components/sidebar-item';

import { TUser } from '@/types';

interface GuestRoutes {
  icon: LucideIcon;
  label: string;
  href: string;
}

const teacherRoutes: GuestRoutes[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/teacher',
  },
  {
    icon: GraduationCap,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: Clock,
    label: 'My Schedule',
    href: '/teacher/schedule',
  },
  {
    icon: MessageCircleMore,
    label: 'Chat',
    href: '/teacher/chat',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
];

interface ISidebarProps {
  user?: TUser;
}

export const SidebarRoutes = ({ user }: ISidebarProps) => {
  const guestRoutes: GuestRoutes[] = [
    ...(user
      ? [
          {
            icon: Layout,
            label: 'Dashboard',
            href: '/',
          },
          {
            icon: ShoppingCart,
            label: 'Cart',
            href: '/cart',
          },
        ]
      : []),
    {
      icon: GraduationCap,
      label: 'Courses',
      href: '/courses',
    },
    {
      icon: Compass,
      label: 'Browse',
      href: '/search',
    },
  ];
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

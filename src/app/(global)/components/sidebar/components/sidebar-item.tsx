import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isActive =
    (pathName === '/' && href === '/') ||
    pathName === href ||
    pathName.startsWith(`${href}`);
  console.log({ href });
  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type='button'
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-white hover:bg-primary-600 rounded-lg group',
        isActive ? 'bg-primary-600 text-white' : ''
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon
          size={22}
          className={cn(
            'text-slate-500 group-hover:text-white',
            isActive ? 'text-white' : ''
          )}
        />
        {label}
      </div>
    </button>
  );
};

export default SidebarItem;

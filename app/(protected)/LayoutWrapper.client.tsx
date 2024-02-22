'use client'
import clsx from 'clsx';
import { useSidebarToggleContext } from '@/contexts/SidebarToggleContext';

export default function LayoutWrapper({ children } : { children: React.ReactNode }) {
    const { sidebarCollapse } = useSidebarToggleContext();

    const layoutClass = clsx('p-3 md:p-5 ml-0', {
      'md:ml-20': sidebarCollapse,
      'md:ml-64': !sidebarCollapse,
    });

    return(
        <div className={layoutClass}>
            {children}
        </div>
    )
}
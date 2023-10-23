"use client";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { IconDashboard, IconJumpRope, IconList, IconStretching, IconUser, IconActivity } from '@tabler/icons-react';

export default function SidebarNav() {
    const pathname = usePathname();

    return (
        <ul className="space-y-2">
            <NavItem
                icon={<IconUser className="h-6 w-6" />}
                label="Profile"
                href="/profile"
                active={pathname === "/profile"}
                subtext="View your profile"
            />
            <NavItem
                icon={<IconDashboard className="h-6 w-6" />}
                label="Dashboard"
                href="/dashboard"
                active={pathname === "/dashboard"}
                subtext="View your progress"
            />
            <NavItem
                icon={<IconActivity className="h-6 w-6" />}
                label="Activity"
                href="/activity"
                active={pathname === "/activity"}
                subtext="View workout logs"
            />
            <NavItem
                icon={<IconJumpRope className="h-6 w-6" />}
                label="Start Workout"
                href="/workout"
                active={pathname === "/workout"}
                subtext="Kick off a session"
            />
            <NavItem
                icon={<IconList className="h-6 w-6" />}
                label="Routines"
                href="/routines"
                active={pathname === "/routines"}
                subtext="Manage your plans"
            />
            <NavItem
                icon={<IconStretching className="h-6 w-6" />}
                label="Exercises"
                href="/exercises"
                active={pathname === "/exercises"}
                subtext="View all exercises"
            />
        </ul>
    );
}

interface NavItemProps {
    icon: JSX.Element;
    label: string;
    href: string;
    active: boolean;
    subtext: string;
}

function NavItem({ icon, label, href, active, subtext }: NavItemProps) {
    return (
        <li className={`px-2 py-1 rounded-lg ${active ? 'bg-success text-black' : 'hover:bg-default-100 hover:text-white'}`}>
            <Link href={href} className="flex items-center space-x-2">
                {icon}
                <div>
                    <div>{label}</div>
                    <div className={`text-sm ${active ? 'text-gray-800' : 'text-gray-500'}`}>{subtext}</div>

                </div>
            </Link>
        </li>
    );
}

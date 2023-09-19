import { Icon, Icons } from '@/components/Icons';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import SignOutButton from '@/components/SignOutButton';
import FriendRequestsSidebarOption from '@/components/FriendRequestsSidebarOption';
import { fetchRedis } from '@/helpers/redis';
import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id';
import SidebarChatList from '@/components/SidebarChatList';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CreateTripForm from '@/components/CreateTripForm';
import { Metadata } from 'next'
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Trips | Wanderer',
  description: 'Browse through the trips wanderers posted.',
}

interface LayoutProps {
    children: ReactNode
}

interface SidebarOption {
    id: number,
    name: string,
    href: string,
    Icon: Icon
};

const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: 'Add friend',
        href: '/dashboard/add',
        Icon: 'UserPlus'
    }
];

const Layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const friends = await getFriendsByUserId(session.user.id);

    const unseenRequestCount = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as User[]).length;

    return <div className='w-full flex h-screen'>
        <Navbar />

        <ScrollArea className="w-full pt-16">
            {children}
        </ScrollArea>
    </div>
}

export default Layout;
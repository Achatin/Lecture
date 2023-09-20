import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Metadata } from 'next'
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Trips | Wanderer',
  description: 'Browse through the trips wanderers posted.',
}

interface LayoutProps {
    children: ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    return <div className='w-full flex h-screen'>
        <Navbar />

        <ScrollArea className="w-full pt-16">
            {children}
        </ScrollArea>
    </div>
}

export default Layout;
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation';
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Bell, PlusSquare } from 'lucide-react'
import CreateTripForm from './CreateTripForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


const Navbar = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <nav className='fixed z-10 flex w-full items-center justify-around border-b h-20 bg-background'>

        <div className='flex items-center'>
            <span className='text-lg font-bold mx-8'>Wanderer</span>
            <Input type="search" placeholder="Search..." className="md:w-[100px] lg:w-[300px]" />
        </div>

        <div className='flex items-center space-x-8'>

            <Sheet>
                <SheetTrigger asChild>
                    <Button className='w-32 font-bold'>
                        <PlusSquare className='w-5 h-5 mx-2' />
                        Post trip
                    </Button>
                </SheetTrigger>

                <SheetContent className='w-full sm:w-[540px] sm:max-w-xl overflow-y-scroll overflow-x-hidden'>
                    <div className='bg-muted w-[120%] -mx-6 -mt-6 mb-4'>
                        <Image src="/illustrations/trip.svg" alt="Road trip illustration" width={300} height={300} className='p-10 mx-auto' />
                    </div>
                    <SheetHeader>
                    <SheetTitle className='text-2xl'>Post Trip</SheetTitle>
                    <SheetDescription>Share your travelling experiences with fellow wanderers.</SheetDescription>
                    </SheetHeader>
                    <CreateTripForm session={session}></CreateTripForm>
                </SheetContent>
            </Sheet>

            <Bell className='text-muted-foreground' />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">shadcn</p>
                            <p className="text-xs leading-none text-muted-foreground">m@example.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>
  )
}

export default Navbar
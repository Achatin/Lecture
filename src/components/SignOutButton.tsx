"use client"

import { Loader2, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ButtonHTMLAttributes, FC, useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from './ui/button';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  
}

const SignOutButton: FC<SignOutButtonProps> = ({...props}) => {
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  return <Button {...props} variant='ghost' onClick={async () => {
    setIsSigningOut(true);
    try {
        await signOut();
    } catch (error) {
        toast.error('There was a problem signing out.');
    } finally {
        setIsSigningOut(false);
    }
  }}>
    {isSigningOut ? (
        <Loader2 className='animate-spin h-4 w-4' />
    ) : (
        <LogOut className='h-4 w-4' />
    )}
  </Button>
}

export default SignOutButton
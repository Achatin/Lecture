import { FC } from 'react'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import Button from "../../../components/ui/Button";
import AddFriendButton from '@/components/AddFriendButton';

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  return (
    <section>
      <h1 className='font-bold text-6xl my-10'>Add a friend</h1>
      <AddFriendButton></AddFriendButton>
    </section>
  )
}

export default page
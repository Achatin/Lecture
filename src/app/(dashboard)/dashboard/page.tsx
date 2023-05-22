import { FC } from 'react'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import Button from "../../../components/ui/Button";

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  
  return <Button size='default' variant='default'>Test</Button>
}

export default page
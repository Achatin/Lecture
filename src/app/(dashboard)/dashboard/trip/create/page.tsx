import CreateTripForm from '@/components/CreateTripForm'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { FC } from 'react'

const page: FC = () => {
    return (
        <main className='flex justify-center py-10'>

            <Card className="max-w-md">
                <div className='bg-muted w-full'>
                    <Image src="/illustrations/trip.svg" alt="Road trip illustration" width={300} height={300} className='p-10 mx-auto' />
                </div>
                <CardHeader>
                    <CardTitle>Post Trip</CardTitle>
                    <CardDescription>Share your travelling experiences with fellow wanderers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateTripForm></CreateTripForm>
                </CardContent>
            </Card>

        </main>
    )
}

export default page
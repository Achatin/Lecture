import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { badgeVariants } from "@/components/ui/badge";

import currencies from '../../../datasets/currencies.json'

interface HorizontalTeaserProps {
  trip: Trip
}

const HorizontalTeaser: FC<HorizontalTeaserProps> = ({trip}) => {
  return (
    <div className="hover:bg-accent hover:text-accent-foreground flex">
        <Link href={`/trip/${trip.id}`}>
            <Image src={trip.image || ""} alt={`thumbnail of a picture of ${trip.destination_location}`} width={400} height={400} />
        </Link>

        <section className="flex flex-col justify-between w-full my-4 mx-8">

            <div className="flex items-center justify-between">
                <Link href={`user/${trip.author.name}`}>
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-5 h-5">
                            <AvatarImage src={trip.author.image} />
                            <AvatarFallback>{trip.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                            <small className="font-bold text-primary hover:underline decoration-2">{trip.author.name}</small>
                    </div>
                </Link>

                <div className="flex items-center space-x-1 cursor-pointer">
                    <Heart size={18} className="text-muted-foreground" />
                    <span className="text-muted-foreground">3</span>
                </div>
            </div>

            <div>
                <Link href={`/trip/${trip.id}`}>
                    <h3 className="text-xl font-bold text-primary mb-0.5 hover:underline decoration-2">{trip.destination_location}</h3>
                </Link>

                <p className="text-muted-foreground line-clamp-1">{trip.description}</p>
            </div>

            <div className="flex items-center justify-between space-x-1">

                <p className='text-muted-foreground text-sm'>
                    <Link href={`/trips?country=${trip.destination_country}`} className={badgeVariants({ variant: "default" })}>{trip.destination_country}</Link>
                    <span className="ml-4">{trip.price} {currencies.find((currency) => currency.cc === trip.currency)?.symbol}</span>
                    <span> · {trip.transport[0].toUpperCase() + trip.transport.slice(1)}</span>
                    <span> · {trip.duration_days ? trip.duration_days + 'd' : ''} {trip.duration_hours ? trip.duration_hours + 'h' : ''} {trip.duration_minutes ? trip.duration_minutes + 'm' : ''} </span>
                </p>

                <p className='text-muted-foreground text-sm'>6 places to visit · 4 tips</p>

            </div>
        </section>
    </div>
  )
}

export default HorizontalTeaser
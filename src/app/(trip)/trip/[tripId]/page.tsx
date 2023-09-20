import { fetchRedis } from '@/helpers/redis';
import { tripArrayValidator } from '@/lib/validations/trip';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BusFront, Heart, MessageCircle, Share } from 'lucide-react';
import Rating from '@/components/trip-form/Rating';


interface pageProps {
  params: {
    tripId: string,
  },
}

export const generateMetadata = async (params: pageProps): Metadata => {
  const trip: Trip = await getTripData(params.params.tripId);

  return {
    title: `${trip.destination_location} | Wanderer`,
    description: '',
  };
};

async function getTripData(tripId: string) {
    try {
      const results: string[] = await fetchRedis('smembers', `trips`);
  
      const dbTripData = results.map((trip) => JSON.parse(trip) as Trip);
      const trips = tripArrayValidator.parse(dbTripData);
  
      return trips.find((trip) => trip.id == tripId) as Trip;
    } catch (error) {
      console.log(error)
      notFound();
    }
}

const page = async (params: pageProps) => {

    const trip: Trip = await getTripData(params.params.tripId);

    return (
      <article className='max-w-2xl mx-auto my-12'>

        <section id="article-header" className='mb-8'>

          <div className='flex items-center justify-between my-6'>
            <h1 className='text-5xl font-bold'>{trip.destination_location}</h1>
            <div className='space-x-2 mt-2.5'>
              <Link href={`/trips?search=${trip.destination_country}`} className={badgeVariants({ variant: "default" })}>{trip.destination_country}</Link>
              <Link href={`/trips?search=Balkan`} className={badgeVariants({ variant: "default" })}>Balkan</Link>
            </div>
          </div>

          <Separator className="my-4" />

          <div className='flex items-center justify-between'>

            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2 group cursor-pointer'>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={trip.author.image} alt={`profile picture of ${trip.author.name}`} />
                  <AvatarFallback>{trip.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className='font-semibold group-hover:underline decoration-2'>{trip.author.name}</span>
              </div>
              <span>·</span>
              <Button variant="link" className='p-0'>Follow</Button>
            </div>

            <div className='flex items-center space-x-6 text-muted-foreground'>
              <div className='flex items-center space-x-1'>
                <Heart /><span>10</span>
              </div>

              <div className='flex items-center space-x-1'>
                <MessageCircle /><span>3</span>
              </div>

              <Share />
            </div>
          </div>

          <Separator className="my-4" />
        </section>

        <Image src={trip.image} alt={`View of ${trip.destination_location} during trip in ${trip.destination_country}`} width={500} height={500} className='mb-6 w-full rounded' />

        <section id="trip-info" className='mb-6'>
          <Separator className="my-4" />

          <div className='flex justify-between'>
            <div>
              <p className='font-medium mb-2'>Overall rating</p>
              <Rating />
            </div>

            <div>
              <p className='font-medium mb-1.5'>Transport from <span className='font-bold'>{trip.start_location}</span>, {trip.start_country} <span className='text-lg'>🇦🇱</span></p>

              <div className='flex items-center text-muted-foreground'>
                <BusFront strokeWidth={1.5} className='mr-1.5' />
                <p>{trip.transport[0].toUpperCase() + trip.transport.slice(1)} · 
                  Arditi Travel{trip.travelling_agency} ·  
                  {trip.duration_days ? trip.duration_days + 'd' : ''} {trip.duration_hours ? trip.duration_hours + 'h' : ''} {trip.duration_minutes ? trip.duration_minutes + 'm · ' : ' · '}
                  {trip.price} {trip.currency} · 
                  Aug 28{trip.travel_date}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />
        </section>

        <p className=''>{trip.description}</p>

        <section id="places-to-visit" className='border-l-4 border-primary my-6 pl-4 pb-1'>
          <h3 className='font-bold text-2xl mb-2'>Places to visit</h3>

          <ul className='list-none grid grid-cols-2 space-y-1'>
            <li>Durres amphiteatre</li>
            <li>Venetian Tower of Durres</li>
            <li>Fatih Mosque</li>
            <li>Bay of Lalzi</li>
          </ul>
        </section>

        <section id="tips" className='my-6 p-4 bg-accent rounded'>
          <h3 className='font-bold text-2xl mb-4'>Tips</h3>

          <ul className='list-none space-y-2'>
            <li className='space-y-1'>
              <Badge>Safety</Badge>
              <p>Avoid wandering at night without car. Stray dogs are active at this time and highly territorial.</p>
            </li>
            
            <li className='space-y-1'>
              <Badge>Food</Badge>
              <p>If you are looking for Halal food, look for a sign at the entrance to the restaurant.</p>
            </li>
          </ul>
        </section>

        <section id="accomodation" className='my-6'>
          <h3 className='font-bold text-2xl mb-4'>Accomodation</h3>

          {/* <div class="airbnb-embed-frame" data-id="618759747225513059" data-view="home" className="w-[450px] h-[300px] m-auto">
            <a href="https://sk.airbnb.com/rooms/618759747225513059?check_in=2023-09-30&amp;check_out=2023-10-07&amp;guests=1&amp;adults=1&amp;s=66&amp;source=embed_widget">Zobraziť na Airbnb</a>
            <a href="https://sk.airbnb.com/rooms/618759747225513059?check_in=2023-09-30&amp;check_out=2023-10-07&amp;guests=1&amp;adults=1&amp;s=66&amp;source=embed_widget" rel="nofollow">Vila · Lovran · ★5,0 · 7&nbsp;spální · 8&nbsp;lôžok · 8 kúpeľní</a>
            <script async="" src="https://sk.airbnb.com/embeddable/airbnb_jssdk"></script>
          </div> */}
          
        </section>

        <Separator className='my-4' />

        <section id="comments" className='my-6'>
          <h3 className='font-bold text-2xl mb-4'>Comments</h3>

        </section>

      </article>
    )
}

export default page
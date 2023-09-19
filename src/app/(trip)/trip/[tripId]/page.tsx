import { fetchRedis } from '@/helpers/redis';
import { tripArrayValidator } from '@/lib/validations/trip';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from "next";


interface pageProps {
  params: {
    tripId: string,
  },
}

export const generateMetadata = async (params: pageProps): Metadata => {
  const trip: Trip = await getTripData(params.params.tripId);

  return {
    title: `${trip.destination_location} by ${trip.author.name} | Wanderer`,
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
      <article className='max-w-2xl mx-auto my-10'>
        <Image src={trip.image} alt={`View of ${trip.destination_location} during trip in ${trip.destination_country}`} width={500} height={500} className='mb-6 w-full' />
        <h1 className='text-3xl font-bold mb-4'>Trip from {trip.start_location} to {trip.destination_location}</h1>
        <p className=''>{trip.description}</p>

        <h3 className='text-2xl font-bold mb-4'>Transport</h3>
        <p itemProp='price'>{trip.price} {trip.currency}</p>

        <h3 className='text-2xl font-bold mb-4'>Places to visit</h3>

        <h3 className='text-2xl font-bold mb-4'>Helpful tips</h3>
      </article>
    )
}

export default page
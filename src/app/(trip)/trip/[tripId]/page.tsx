import { fetchRedis } from '@/helpers/redis';
import { tripArrayValidator } from '@/lib/validations/trip';
import { notFound } from 'next/navigation';


interface pageProps {
  params: {
    tripId: string,
  },
}

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

    const td: Trip = await getTripData(params.params.tripId);

    return (
      <article className='max-w-2xl mx-auto my-10'>
        <img src="" alt={`View of ${td.destination_location} during trip in ${td.destination_country}`} className='mb-6' />
        <h1 className='text-3xl font-bold mb-4'>Trip from {td.start_location} to {td.destination_location}</h1>
        <p className=''>{td.description}</p>

        <h3 className='text-2xl font-bold mb-4'>Transport</h3>
        <p itemProp='price'>{td.price} {td.currency}</p>

        <h3 className='text-2xl font-bold mb-4'>Places to visit</h3>

        <h3 className='text-2xl font-bold mb-4'>Helpful tips</h3>
      </article>
    )
}

export default page
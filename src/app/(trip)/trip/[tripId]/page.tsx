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

    const tripData: Trip = await getTripData(params.params.tripId);

    return <div>{ tripData.destination_country }</div>
}

export default page
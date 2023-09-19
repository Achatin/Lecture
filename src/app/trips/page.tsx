import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRedis } from "@/helpers/redis";
import { tripArrayValidator } from "@/lib/validations/trip";
import { notFound } from 'next/navigation';
import HorizontalTeaser from "@/components/trip-teasers/HorizontalTeaser";

interface pageProps {}

async function getTrips() {
    try {
      const results: string[] = await fetchRedis('smembers', `trips`);
  
      const dbTripData = results.map((trip) => JSON.parse(trip) as Trip);
      const trips = tripArrayValidator.parse(dbTripData);
  
      return trips;
    } catch (error) {
      console.log(error)
      notFound();
    }
}

const page = async ({}) => {
    const trips = await getTrips() as Trip[];

    return (
        <main className="max-w-3xl mx-auto mt-10 space-y-6">
            {trips.map((trip) => {
                return (
                    <HorizontalTeaser trip={trip} />
                )
            })}
        </main>
    )
}

export default page
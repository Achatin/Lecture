import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRedis } from "@/helpers/redis";
import { tripArrayValidator } from "@/lib/validations/trip";
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
        <main className="max-w-6xl mx-auto mt-10">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                {trips.map((trip) => {
                    return (
                        <Link href={`/trip/${trip.id}`}>
                            <Card className="w-[350px] hover:bg-accent hover:text-accent-foreground">
                                <CardHeader>
                                    <CardTitle>{trip.start_location} → {trip.destination_location}</CardTitle>
                                    <CardDescription>Trip from <span className="font-medium">{trip.start_country}, {trip.start_location}</span> to <span className="font-medium">{trip.destination_country}, {trip.destination_location}</span>.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </main>
    )
}

export default page
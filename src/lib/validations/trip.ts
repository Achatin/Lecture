import { z } from 'zod'

export const postTripValidator = z.object({
    start_country: z.string().min(1).max(255),
    start_location: z.string().min(1).max(255),
    destination_country: z.string().min(1).max(255),
    destination_location: z.string().min(1).max(255),
    transport: z.string().min(1).max(255),
    travelling_agency: z.string().min(1).max(255).optional(),
    duration_days: z.coerce.number().min(0).optional(),
    duration_hours: z.coerce.number().min(0).max(23).optional(),
    duration_minutes: z.coerce.number().min(0).max(59).optional(),
    price: z.coerce.number().min(0).optional(),
    currency: z.string().min(1).max(10).optional(),
    travel_date: z.string().optional(),
    rating: z.coerce.number().min(1).max(5).optional(),
    places_2_visit: z.array(z.string().min(1).max(32)).optional(),
    tips: z.array(z.string().min(1).max(256)).optional(),
    nightstay: z.boolean().optional(),
    image: z.string(),
    description: z.string().optional(),
    accommodation: z.object({
        accomodation_type: z.string().min(1).max(255).optional(),
        accomodation_link: z.string().url().optional(),
        accomodation_price: z.number().min(0).optional(),
        accomodation_currency: z.string().min(1).max(10).optional(),
        accomodation_rating: z.number().min(1).max(5).optional(),
    }).optional(),
});

export const tripValidator = z.object({
    id: z.string(),
    author: z.object({}).optional(),
    start_country: z.string().min(1).max(255),
    start_location: z.string().min(1).max(255),
    destination_country: z.string().min(1).max(255),
    destination_location: z.string().min(1).max(255),
    transport: z.string().min(1).max(255),
    travelling_agency: z.string().min(1).max(255).optional(),
    duration_days: z.coerce.number().min(0).optional(),
    duration_hours: z.coerce.number().min(0).max(23).optional(),
    duration_minutes: z.coerce.number().min(0).max(59).optional(),
    price: z.coerce.number().min(0).optional(),
    currency: z.string().min(1).max(10).optional(),
    travel_date: z.string().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    places_2_visit: z.array(z.string().min(1).max(32)).optional(),
    tips: z.array(z.string().min(1).max(256)).optional(),
    nightstay: z.boolean().optional(),
    image: z.string(),
    description: z.string().optional(),
    accommodation: z.object({
        accomodation_type: z.string().min(1).max(255).optional(),
        accomodation_link: z.string().url().optional(),
        accomodation_price: z.number().min(0).optional(),
        accomodation_currency: z.string().min(1).max(10).optional(),
        accomodation_rating: z.number().min(0).max(5).optional(),
    }).optional(),
});

export const tripArrayValidator = z.array(tripValidator);

export type Trip = z.infer<typeof postTripValidator>;
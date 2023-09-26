import { z } from 'zod'

export const postTripValidator = z.object({
    start_country: z.string().min(1).max(255),
    start_location: z.string().min(1).max(255),
    destination_country: z.string().min(1).max(255),
    destination_location: z.string().min(1).max(255),
    transport: z.string().min(1).max(255),
    travelling_agency: z.string().min(1).max(255).optional(),
    duration: z.object({
        days: z.coerce.number().min(0).optional(),
        hours: z.coerce.number().min(0).max(23).optional(),
        minutes: z.coerce.number().min(0).max(59).optional(),
    }).optional(),
    price: z.coerce.number().min(0).optional(),
    currency: z.string().min(1).max(10).optional(),
    travel_date: z.coerce.date().optional(),
    rating: z.coerce.number().min(1).max(5),
    places_2_visit: z.array(z.string().min(1).max(60)).optional(),
    tips: z.array(z.string().min(1).max(300)).optional(),
    image: z.string(),
    description: z.string().optional(),
    accommodation: z.object({
        url: z.string().optional(),
        image: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
    }).optional(),
});

export const tripValidator = z.object({
    id: z.string(),
    author: z.object({
        name: z.string(),
        email: z.string(),
        image: z.string(),
        id: z.string(),
    }),
    start_country: z.string().min(1).max(255),
    start_location: z.string().min(1).max(255),
    destination_country: z.string().min(1).max(255),
    destination_location: z.string().min(1).max(255),
    transport: z.string().min(1).max(255),
    travelling_agency: z.string().min(1).max(255).optional(),
    duration: z.object({
        days: z.coerce.number().min(0).optional(),
        hours: z.coerce.number().min(0).max(23).optional(),
        minutes: z.coerce.number().min(0).max(59).optional(),
    }).optional(),
    price: z.coerce.number().min(0).optional(),
    currency: z.string().min(1).max(10).optional(),
    travel_date: z.coerce.date().optional(),
    rating: z.coerce.number().min(1).max(5),
    places_2_visit: z.array(z.string().min(1).max(60)).optional(),
    tips: z.array(z.string().min(1).max(300)).optional(),
    image: z.string(),
    description: z.string().optional(),
    accommodation: z.object({
        url: z.string().optional(),
        image: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
    }).optional(),
});

export const tripArrayValidator = z.array(tripValidator);

export type Trip = z.infer<typeof postTripValidator>;
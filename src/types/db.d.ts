interface User {
    name: string
    email: string
    image: string
    id: string
}

interface Chat {
    id: string
    messages: Message[]
}

interface Message {
    id: string
    senderId: string
    receiverId: string
    text: string
    timestamp: number
}

interface FriendRequest {
    id: string
    senderId: string
    receiverId: string
}

interface Trip {
    id: string;
    author: {
        name: string;
        email: string;
        image: string;
        id: string;
    };
    start_country: string;
    start_location: string;
    destination_country: string;
    destination_location: string;
    transport: string;
    travelling_agency?: string | null;
    duration: {
        days?: number | null;
        hours?: number | null;
        minutes?: number | null;
    };
    price?: number | null;
    currency?: string | null;
    travel_date?: Date | null;
    rating?: number | null;
    places_2_visit?: string[] | null;
    tips?: string[] | null;
    nightstay?: boolean | null;
    image?: string | null;
    description?: string | "";
    accommodation?: {
        url?: string | null;
        image?: string | null;
        title?: string | null;
        description?: string | null;
        accomodation_rating?: number | null;
    } | null;
}  
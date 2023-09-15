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
    id: string
    start_country: string
    start_location: string
    destination_country: string
    destination_location: string
    transport: string
}
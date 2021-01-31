import { Movie } from './movies';

export interface Room {
    roomName: string | null;
    roomId: string | null;
    participants: Participant[];
    movies: Movie[];
    stage: 'selection' | 'swiper' | 'results' | null;
}

export interface Participant {
    name: string;
    id: string;
    color: string;
}

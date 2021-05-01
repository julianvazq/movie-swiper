import { Movie } from './movies';

export interface Room {
    roomName: string | null;
    roomId: string | null;
    ownerId: string | null;
    participants: Participant[];
    viewers: Participant[];
    movies: Movie[];
    stage: 'selection' | 'swiper' | 'results' | null;
}

export interface Participant {
    name: string;
    id: string;
    color: string;
    ready?: boolean;
}

type Data = string | number | boolean | Room | Movie;

interface SuccessResponse {
    success: true;
    data: { [key: string]: Data };
}

interface FailResponse {
    success: false;
    message: string;
}

export type SocketResponse = SuccessResponse | FailResponse;

export type SocketCallback = (res: SocketResponse) => void;

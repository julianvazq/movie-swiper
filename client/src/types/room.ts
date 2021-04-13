import { AddedMovie } from './movies';

export enum Stage {
    SELECTION = 'selection',
    SWIPER = 'swiper',
    RESULTS = 'results',
    NULL = 'null',
}

export interface Room {
    roomName: string | null;
    roomId: string | null;
    participants: Participant[];
    movies: AddedMovie[];
    stage: Stage;
}

export interface Participant {
    name: string;
    id: string;
    color: string;
    ready?: boolean;
    owner?: boolean;
}

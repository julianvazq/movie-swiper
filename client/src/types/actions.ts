import { Participant } from './room';
import { Movie } from './movies';

export enum ActionType {
    INITIALIZE_ROOM = 'initialize_room',
    JOIN = 'join',
    LEAVE = 'leave',
    ADD_MOVIE = 'add_movie',
    REMOVE_MOVIE = 'remove_movie',
}

export interface InitializeRoomAction {
    type: ActionType.INITIALIZE_ROOM;
    payload: { roomName: string; participant: Participant };
}

export interface JoinAction {
    type: ActionType.JOIN;
    payload: Participant;
}

export interface LeaveAction {
    type: ActionType.LEAVE;
    payload: { id: string };
}

export interface AddMovieAction {
    type: ActionType.ADD_MOVIE;
    payload: Movie;
}

export interface RemoveMovieAction {
    type: ActionType.REMOVE_MOVIE;
    payload: { id: number };
}

export type Action = JoinAction | LeaveAction | AddMovieAction | RemoveMovieAction | InitializeRoomAction;

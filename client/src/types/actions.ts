import { Participant, Room, Stage } from './room';
import { AddedMovie } from './movies';

export enum ActionType {
    INITIALIZE_ROOM = 'initialize_room',
    GET_ROOM = 'get_room',
    JOIN = 'join',
    LEAVE = 'leave',
    ADD_MOVIE = 'add_movie',
    REMOVE_MOVIE = 'remove_movie',
    SWIPE_MOVIE = 'swipe_movie',
    TOGGLE_READY = 'toggle_ready',
    SET_STAGE = 'set_stage',
}

export interface GetRoomAction {
    type: ActionType.GET_ROOM;
    payload: { room: Room };
}

export interface InitializeRoomAction {
    type: ActionType.INITIALIZE_ROOM;
    payload: { roomName: string; roomId: string; participant: Participant };
}

export interface JoinAction {
    type: ActionType.JOIN;
    payload: { participant: Participant };
}

export interface LeaveAction {
    type: ActionType.LEAVE;
    payload: { id: string };
}

export interface AddMovieAction {
    type: ActionType.ADD_MOVIE;
    payload: { movie: AddedMovie };
}

export interface RemoveMovieAction {
    type: ActionType.REMOVE_MOVIE;
    payload: { id: number };
}

export interface SwipeMovieAction {
    type: ActionType.SWIPE_MOVIE;
    payload: { id: number; userId: string; liked: boolean };
}

export interface ToggleReadyAction {
    type: ActionType.TOGGLE_READY;
    payload: { id: string };
}

export interface SetStageAction {
    type: ActionType.SET_STAGE;
    payload: { stage: Stage.SELECTION | Stage.SWIPER };
}

export type Action =
    | JoinAction
    | LeaveAction
    | AddMovieAction
    | RemoveMovieAction
    | SwipeMovieAction
    | InitializeRoomAction
    | GetRoomAction
    | ToggleReadyAction
    | SetStageAction;

import { AddedMovie } from './movies';
import { Participant, Room, Stage } from './room';

export enum ActionType {
    INITIALIZE_ROOM = 'initialize_room',
    GET_ROOM = 'get_room',
    JOIN = 'join',
    LEAVE = 'leave',
    CHANGE_OWNER = 'change_owner',
    ADD_MOVIE = 'add_movie',
    REMOVE_MOVIE = 'remove_movie',
    SWIPE_MOVIE = 'swipe_movie',
    TOGGLE_READY = 'toggle_ready',
    SET_STAGE = 'set_stage',
    USER_NAME_CHANGE = 'user_name_change',
}

export interface GetRoomAction {
    type: ActionType.GET_ROOM;
    payload: { room: Room };
}

export interface InitializeRoomAction {
    type: ActionType.INITIALIZE_ROOM;
    payload: { roomName: string; roomId: string; ownerId: string; participant: Participant };
}

export interface JoinAction {
    type: ActionType.JOIN;
    payload: { participant: Participant };
}

export interface LeaveAction {
    type: ActionType.LEAVE;
    payload: { id: string };
}

export interface ChangeOwnerAction {
    type: ActionType.CHANGE_OWNER;
    payload: { ownerId: string };
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
    payload: { id: number; liked: boolean; user: Participant };
}

export interface ToggleReadyAction {
    type: ActionType.TOGGLE_READY;
    payload: { id: string };
}

export interface SetStageAction {
    type: ActionType.SET_STAGE;
    payload: { stage: Stage.SELECTION | Stage.SWIPER };
}

export interface UserNameChangeAction {
    type: ActionType.USER_NAME_CHANGE;
    payload: { userId: string; name: string };
}

export type Action =
    | JoinAction
    | LeaveAction
    | ChangeOwnerAction
    | AddMovieAction
    | RemoveMovieAction
    | SwipeMovieAction
    | InitializeRoomAction
    | GetRoomAction
    | ToggleReadyAction
    | SetStageAction
    | UserNameChangeAction;

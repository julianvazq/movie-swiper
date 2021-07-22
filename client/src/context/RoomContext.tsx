/* eslint-disable react/display-name */
import React, { createContext, ReactNode, useContext, useEffect, useReducer, useRef } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { Participant } from '../../../server/src/types';
import { socket } from '../sockets';
import { changeRoomOwner } from '../sockets/emitters';
import {
    onGetRoom,
    onMovieAdd,
    onMovieRemove,
    onMovieSwipe,
    onNameChange,
    onParticipantJoin,
    onParticipantLeave,
    onRoomOwnerChange,
    onStartSwiper,
    onToggleReady,
} from '../sockets/listeners';
import { FontWeight600 } from '../styles';
import { Action, ActionType } from '../types/actions';
import { AddedMovie } from '../types/movies';
import { Room, Stage } from '../types/room';
import { ToastType, useToast } from '../utils';
import { useUser } from './UserContext';

type Props = {
    children: ReactNode;
};

const initialState: Room = {
    roomName: null,
    roomId: null,
    ownerId: null,
    participants: [],
    movies: [],
    stage: Stage.NULL,
};

interface ContextProps {
    room: Room;
    dispatch: (action: Action) => void;
}
export const RoomContext = createContext<ContextProps>({ room: initialState, dispatch: () => ({}) });

export const useRoom = () => {
    return useContext(RoomContext);
};

const reducer = (state: Room, action: Action): Room => {
    switch (action.type) {
        case ActionType.INITIALIZE_ROOM:
            return {
                ...initialState,
                roomName: action.payload.roomName,
                roomId: action.payload.roomId,
                ownerId: action.payload.ownerId,
                participants: [action.payload.participant],
                stage: Stage.SELECTION,
            };
        case ActionType.GET_ROOM:
            return {
                ...action.payload.room,
            };
        case ActionType.JOIN:
            const participants = [
                ...state.participants.filter((p) => p.id !== action.payload.participant.id),
                action.payload.participant,
            ];
            return { ...state, participants };
        case ActionType.LEAVE:
            return {
                ...state,
                participants: state.participants.filter((p) => p.id !== action.payload.id),
            };
        case ActionType.CHANGE_OWNER:
            return {
                ...state,
                ownerId: action.payload.ownerId,
            };
        case ActionType.ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies.filter((m) => m.id !== action.payload.movie.id), action.payload.movie],
            };
        case ActionType.REMOVE_MOVIE:
            return { ...state, movies: state.movies.filter((m) => m.id !== action.payload.id) };
        case ActionType.SWIPE_MOVIE:
            const swipedMovie = state.movies.find((m) => m.id === action.payload.id) as AddedMovie;
            const alreadySwiped = swipedMovie.swipes.find((swipe) => swipe.user.id === action.payload.user.id);
            const updatedSwipes = alreadySwiped
                ? swipedMovie.swipes.map((swipe) =>
                      swipe.user.id === action.payload.user.id ? { ...swipe, liked: action.payload.liked } : swipe,
                  )
                : [...swipedMovie.swipes, { user: action.payload.user, liked: action.payload.liked }];
            const updatedMovie: AddedMovie = { ...swipedMovie, swipes: updatedSwipes };
            return {
                ...state,
                movies: state.movies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)),
            };
        case ActionType.SET_STAGE:
            return { ...state, stage: action.payload.stage };
        case ActionType.TOGGLE_READY:
            return {
                ...state,
                participants: state.participants.map((p) =>
                    p.id === action.payload.id ? { ...p, ready: !p.ready } : p,
                ),
            };
        case ActionType.USER_NAME_CHANGE:
            return {
                ...state,
                participants: state.participants.map((p) =>
                    p.id === action.payload.userId ? { ...p, name: action.payload.name } : p,
                ),
            };
        default:
            throw new Error('Action not defined.');
    }
};

const LS_KEY = 'rooms';

const RoomProvider = ({ children }: Props) => {
    const { pathname } = useLocation();
    const { user } = useUser();
    const [room, dispatch] = useReducer(reducer, initialState, getLocalStorage);
    const toastId = useRef<string>();
    const toastTimeoutId = useRef<number>();
    const changeOwnerTimeoutId = useRef<number>();

    function getLSRooms(): { [key: string]: Room } | null {
        const item = localStorage.getItem(LS_KEY);
        if (!item) return null;
        return JSON.parse(item);
    }

    function getLocalStorage(initialState: Room) {
        const item = localStorage.getItem(LS_KEY);
        if (!item) return initialState;

        const rooms: { [key: string]: Room } = JSON.parse(item);
        const roomIdParam = pathname.split('/').filter(Boolean)[1];
        const room = rooms[roomIdParam];
        return room ? room : initialState;
    }

    function setLocalStorage(rooms: { [key: string]: Room }) {
        localStorage.setItem(LS_KEY, JSON.stringify(rooms));
    }

    useEffect(() => {
        const rooms = getLSRooms();
        if (room.roomId) {
            const updatedRooms = { ...rooms, [room.roomId as string]: room };
            setLocalStorage(updatedRooms);
        }
    }, [room]);

    useEffect(() => {
        onParticipantJoin(room, (newParticipant) => {
            if (newParticipant.id === room.ownerId) {
                clearTimeout(changeOwnerTimeoutId.current);
            }
            useToast({
                type: ToastType.Success,
                message: () => (
                    <span>
                        <FontWeight600>{newParticipant.name}</FontWeight600> {' joined.'}
                    </span>
                ),
            });
            dispatch({ type: ActionType.JOIN, payload: { participant: { ...newParticipant, ready: false } } });
        });
        onParticipantLeave(({ socketId, newOwnerSocketId }) => {
            dispatch({ type: ActionType.LEAVE, payload: { id: socketId } });
            if (socketId === room.ownerId && newOwnerSocketId === socket.id) {
                changeOwnerTimeoutId.current = window.setTimeout(() => {
                    changeRoomOwner({ roomId: room.roomId as string, userId: user.id });
                }, 10000);
            }
        });
        onRoomOwnerChange(({ newOwnerId }) => {
            dispatch({ type: ActionType.CHANGE_OWNER, payload: { ownerId: newOwnerId } });
            if (newOwnerId === user.id) {
                useToast({
                    type: ToastType.Custom,
                    message: () => (
                        <span>
                            You are the new room owner. <br />
                            Tap on <FontWeight600>&quot;Start Swiping&quot;</FontWeight600> to begin.
                        </span>
                    ),
                    duration: 8000,
                });
            }
        });
        onGetRoom(({ room }) => {
            const user: Participant = JSON.parse(localStorage.getItem('user') || '');
            /* Remove duplicate user */
            let participants: Participant[] = room.participants.filter((p) => p.id !== user.id);
            if (user) {
                participants = [...participants, { ...user, ready: false } as Participant];
            }
            dispatch({ type: ActionType.GET_ROOM, payload: { room: { ...room, participants } } });
        });
        onMovieAdd((movie) => {
            const addedByOtherUser = movie.addedByUserId !== user.id;
            if (addedByOtherUser) {
                useToast({
                    type: ToastType.Success,
                    message: () => (
                        <span>
                            Someone added <FontWeight600>{movie.title}</FontWeight600>.
                        </span>
                    ),
                });
            }
            dispatch({ type: ActionType.ADD_MOVIE, payload: { movie } });
        });
        onMovieRemove(({ movieId }) => {
            dispatch({ type: ActionType.REMOVE_MOVIE, payload: { id: movieId } });
        });
        onMovieSwipe(({ movieId, liked, user }) => {
            dispatch({ type: ActionType.SWIPE_MOVIE, payload: { id: movieId, liked, user } });
        });
        onToggleReady(({ userId }) => {
            const userToToggle = room.participants.find((p) => p.id === userId);
            if (userToToggle && !userToToggle.ready && user.id !== userToToggle.id) {
                useToast({
                    type: ToastType.Success,
                    message: () => (
                        <span>
                            <FontWeight600>{userToToggle.name}</FontWeight600> is ready.
                        </span>
                    ),
                });
            }
            dispatch({ type: ActionType.TOGGLE_READY, payload: { id: userId } });
        });
        onStartSwiper(({ roomId }) => {
            if (roomId !== room.roomId) return;
            dispatch({ type: ActionType.SET_STAGE, payload: { stage: Stage.SWIPER } });
        });
        onNameChange(({ userId, name }) => {
            const affectedUser = room.participants.find((p) => p.id === userId);
            if (affectedUser && affectedUser.id !== user.id) {
                const oldName = affectedUser?.name;
                useToast({
                    type: ToastType.Success,
                    message: () => (
                        <span>
                            <FontWeight600>{oldName}</FontWeight600> {' has changed their name to '}{' '}
                            <FontWeight600>{name}.</FontWeight600>
                        </span>
                    ),
                });
            }
            dispatch({ type: ActionType.USER_NAME_CHANGE, payload: { userId, name } });
        });

        return () => {
            socket.removeAllListeners();
        };
    }, [socket, room, dispatch]);

    useEffect(() => {
        const isOwner = user.id === room.ownerId;
        const participants = room.participants.filter((p) => p.id !== user.id);
        const everyoneReady = participants.length > 0 && participants.every((p) => p.ready);
        if (!everyoneReady && toastTimeoutId.current) {
            clearTimeout(toastTimeoutId.current);
            toast.dismiss(toastId.current);
        }
        if (isOwner && everyoneReady) {
            toastTimeoutId.current = window.setTimeout(
                () =>
                    (toastId.current = useToast({
                        type: ToastType.Success,
                        message: () => (
                            <span>
                                Everyone is ready to start.
                                <br />
                                Tap on <FontWeight600>&quot;Start Swiping&quot;.</FontWeight600>
                            </span>
                        ),
                        duration: 99999,
                    })),
                2500,
            );
        }
    }, [room.participants]);

    useEffect(() => {
        clearTimeout(toastTimeoutId.current);
        if (toastId.current) {
            toast.dismiss(toastId.current);
        }
    }, [pathname]);

    return <RoomContext.Provider value={{ room, dispatch }}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

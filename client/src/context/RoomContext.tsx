/* eslint-disable react/display-name */
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { Participant } from '../../../server/src/types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { socket } from '../sockets';
import {
    onGetRoom,
    onMovieAdd,
    onMovieRemove,
    onMovieSwipe,
    onNameChange,
    onParticipantJoin,
    onParticipantLeave,
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
    console.log(action);
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
            throw new Error();
    }
};

const RoomProvider = ({ children }: Props) => {
    const { user } = useUser();
    const [room, dispatch] = useReducer(reducer, initialState);
    const [storedMovies, setStoredMovies] = useLocalStorage('movies', {});

    useEffect(() => {
        if (room.movies) {
            const newMovieList = {
                id: room.roomId,
                movies: room.movies,
            };
            setStoredMovies({ ...storedMovies, newMovieList });
        }
    }, [room.movies]);

    useEffect(() => {
        onParticipantJoin(room, (newParticipant) => {
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
        onParticipantLeave(({ socketId }) => {
            dispatch({ type: ActionType.LEAVE, payload: { id: socketId } });
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
                console.log(userToToggle, user);
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
            if (roomId !== room.roomId) {
                return;
            }
            dispatch({ type: ActionType.SET_STAGE, payload: { stage: Stage.SWIPER } });
        });
        onNameChange(({ userId, name }) => {
            const user = room.participants.find((p) => p.id === userId);
            if (user) {
                const oldName = user?.name;
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

    return <RoomContext.Provider value={{ room, dispatch }}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

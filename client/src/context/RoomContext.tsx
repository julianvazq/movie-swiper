/* eslint-disable react/display-name */
import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Action, ActionType } from '../types/actions';
import { Room, Stage } from '../types/room';
import {
    onParticipantJoin,
    onParticipantLeave,
    onGetRoom,
    onMovieAdd,
    onMovieRemove,
    onToggleReady,
    onStartSwiper,
    onMovieSwipe,
} from '../sockets/listeners';
import { socket } from '../sockets';
import { Participant } from '../../../server/src/types';
import { ToastType, useToast } from '../utils';
import { FontWeight600 } from '../styles';
import { useUser } from './UserContext';
import { AddedMovie } from '../types/movies';
import { swipeMovie } from '../sockets/emitters';

type Props = {
    children: ReactNode;
};

const initialState: Room = {
    roomName: null,
    roomId: null,
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
                participants: state.participants.filter((participant) => participant.id !== action.payload.id),
            };
        case ActionType.ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies.filter((movie) => movie.id !== action.payload.movie.id), action.payload.movie],
            };
        case ActionType.REMOVE_MOVIE:
            return { ...state, movies: state.movies.filter((movie) => movie.id !== action.payload.id) };
        case ActionType.SWIPE_MOVIE:
            const swipedMovie = state.movies.find((movie) => movie.id === action.payload.id) as AddedMovie;
            console.log('swiped movie:', swipedMovie);
            const alreadySwiped = swipedMovie.swipes.find((swipe) => swipe.userId === action.payload.userId);
            const updatedSwipes = alreadySwiped
                ? swipedMovie.swipes.map((swipe) =>
                      swipe.userId === action.payload.userId
                          ? { userId: action.payload.userId, liked: action.payload.liked }
                          : swipe,
                  )
                : [...swipedMovie.swipes, { userId: action.payload.userId, liked: action.payload.liked }];
            const updatedMovie: AddedMovie = { ...swipedMovie, swipes: updatedSwipes };
            return {
                ...state,
                movies: state.movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)),
            };
        case ActionType.SET_STAGE:
            return { ...state, stage: action.payload.stage };
        case ActionType.TOGGLE_READY:
            return {
                ...state,
                participants: state.participants.map((participant) =>
                    participant.id === action.payload.id ? { ...participant, ready: !participant.ready } : participant,
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
            console.log(socketId, ' left');
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
        onMovieSwipe(({ movieId, userId, liked }) => {
            console.log('swiped', liked);
            dispatch({ type: ActionType.SWIPE_MOVIE, payload: { id: movieId, userId, liked } });
        });
        onToggleReady(({ userId }) => {
            /* Bug: toast displays for person that clicked 'Ready' */
            // const userToToggle = room.participants.find((p) => p.id === userId);
            // if (userToToggle && user.id !== userToToggle?.id) {
            //     useToast({ type: ToastType.Success, message: `${userToToggle.name} is ready.` });
            // }
            dispatch({ type: ActionType.TOGGLE_READY, payload: { id: userId } });
        });
        onStartSwiper(({ roomId }) => {
            if (roomId !== room.roomId) {
                return;
            }
            dispatch({ type: ActionType.SET_STAGE, payload: { stage: Stage.SWIPER } });
        });

        return () => {
            socket.removeAllListeners();
        };
    }, [socket, room, dispatch]);

    return <RoomContext.Provider value={{ room, dispatch }}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

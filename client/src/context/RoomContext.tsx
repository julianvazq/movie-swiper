import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Action, ActionType } from '../types/actions';
import { Room, Stage } from '../types/room';
import { onParticipantJoin, onParticipantLeave, onGetRoom, onMovieAdd, onMovieRemove } from '../sockets/listeners';
import { socket } from '../sockets';
import { Participant } from '../../../server/src/types';
import toast from 'react-hot-toast';

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
                ...state,
                roomName: action.payload.roomName,
                roomId: action.payload.roomId,
                participants: [action.payload.participant],
                stage: Stage.SELECTION,
            };
        case ActionType.GET_ROOM:
            return {
                ...action.payload,
            };
        case ActionType.JOIN:
            const participants = [...state.participants.filter((p) => p.id !== action.payload.id), action.payload];
            return { ...state, participants };
        case ActionType.LEAVE:
            return {
                ...state,
                participants: state.participants.filter((participant) => participant.id !== action.payload.id),
            };
        case ActionType.ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies.filter((movie) => movie.id !== action.payload.id), action.payload],
            };
        case ActionType.REMOVE_MOVIE:
            return { ...state, movies: state.movies.filter((movie) => movie.id !== action.payload.id) };
        default:
            throw new Error();
    }
};

const RoomProvider = ({ children }: Props) => {
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
        let toastId: string;
        onParticipantJoin(room, (newParticipant) => {
            console.log('NEW JOIN TOASTER', room.participants, newParticipant);
            toast.remove(toastId);
            toast.success(`${newParticipant.name} joined.`);
            dispatch({ type: ActionType.JOIN, payload: newParticipant });
        });
        onParticipantLeave(({ socketId }) => {
            console.log(socketId, ' left');
            dispatch({ type: ActionType.LEAVE, payload: { id: socketId } });
        });
        onGetRoom(({ room }) => {
            console.log('got ROOM: ', room);
            const user: Participant = JSON.parse(localStorage.getItem('user') || '');
            /* Remove duplicate user */
            let participants: Participant[] = [...room.participants.filter((p) => p.id !== user.id)];
            if (user) {
                participants = [...participants, user];
            }
            dispatch({ type: ActionType.GET_ROOM, payload: { ...room, participants } });
        });
        onMovieAdd((movie) => {
            dispatch({ type: ActionType.ADD_MOVIE, payload: movie });
        });
        onMovieRemove(({ movieId }) => {
            dispatch({ type: ActionType.REMOVE_MOVIE, payload: { id: movieId } });
        });
        return () => {
            socket.removeAllListeners();
        };
    }, [socket, room, dispatch]);

    return <RoomContext.Provider value={{ room, dispatch }}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

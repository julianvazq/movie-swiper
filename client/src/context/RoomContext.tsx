import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Action, ActionType } from '../types/actions';
import { Room, Stage } from '../types/room';
import { onParticipantJoin, onParticipantLeave, onGetRoom } from '../sockets/listeners';
import { socket } from '../sockets';
import { Participant } from '../../../server/src/types';

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
            return { ...state, participants: [...state.participants, action.payload] };
        case ActionType.LEAVE:
            return {
                ...state,
                participants: state.participants.filter((participant) => participant.id !== action.payload.id),
            };
        case ActionType.ADD_MOVIE:
            return { ...state, movies: [...state.movies, action.payload] };
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
        onParticipantJoin(room, (newParticipant) => {
            dispatch({ type: ActionType.JOIN, payload: newParticipant });
        });
        onParticipantLeave(({ socketId }) => {
            console.log(socketId, ' left');
            dispatch({ type: ActionType.LEAVE, payload: { id: socketId } });
        });
        onGetRoom(({ room }) => {
            console.log('got ROOM: ', room);
            const user: Participant = JSON.parse(localStorage.getItem('user') || '');
            let participants: Participant[] = [...room.participants];
            if (user) {
                participants = [...participants, user];
            }
            dispatch({ type: ActionType.GET_ROOM, payload: { ...room, participants } });
        });
        return () => {
            socket.removeAllListeners();
        };
    }, [socket, room, dispatch]);

    return <RoomContext.Provider value={{ room, dispatch }}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

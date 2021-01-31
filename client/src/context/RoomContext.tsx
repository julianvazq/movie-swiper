import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Action, ActionType, Room } from '../types';

type Props = {
    children: ReactNode;
};

const initialState: Room = {
    roomName: null,
    roomId: null,
    participants: [],
    viewers: [],
    movies: [],
    stage: null,
};

interface ContextProps {
    room: any;
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
                ...state,
                roomName: action.payload.roomName,
                participants: [action.payload.participant],
                stage: 'selection',
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
    const [state, dispatch] = useReducer(reducer, initialState);
    const [room, setRoom] = useLocalStorage('room', state);
    useEffect(() => {
        setRoom(state);
    }, [state]);

    return <RoomContext.Provider value={{ room, dispatch }}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

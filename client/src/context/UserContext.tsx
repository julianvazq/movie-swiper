import React, { useEffect, createContext, useContext } from 'react';
import { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { socket } from '../sockets';
import { onConnection } from '../sockets/listeners';
import { Participant } from '../types/room';

type Props = {
    children: ReactNode;
};

interface ContextProps {
    user: Participant;
    setUser: (value: Participant) => void;
}
export const UserContext = createContext<ContextProps>({ user: {} as Participant, setUser: () => ({}) });

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useLocalStorage('user', {} as Participant);

    useEffect(() => {
        onConnection(() => {
            if (!user.id) {
                setUser({ ...user, id: socket.id });
                socket.emit('user:new', { ...user, id: socket.id });
            } else {
                socket.emit('user:new', user);
            }
        });
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;

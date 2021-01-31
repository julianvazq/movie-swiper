import React, { useEffect, createContext, useContext } from 'react';
import { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Participant } from '../types';

type Props = {
    children: ReactNode;
};

interface ContextProps {
    user: Participant | any;
    setUser: (value: Participant) => void;
}
export const UserContext = createContext<ContextProps>({ user: null, setUser: () => ({}) });

export const userUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useLocalStorage('user', {});

    useEffect(() => {
        setUser(user);
    }, [user]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;

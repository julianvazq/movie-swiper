import React, { useState, useEffect, createContext } from 'react';
import { io } from 'socket.io-client';
// import io from 'socket.io-client';

type Props = {
    children: JSX.Element;
};

/* Connect socket */
const socket = io();

export const SocketContext = createContext({} as any);

export const useSocket = () => {
    return SocketProvider(SocketContext);
};

const SocketProvider = ({ children }: any) => {
    const value = { socket };
    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

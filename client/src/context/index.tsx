import React, { useState, useEffect, createContext, useContext } from 'react';

type Props = {
    children: JSX.Element;
};

export const RoomContext = createContext({} as any);

export const useRoom = () => {
    return useContext(RoomContext);
};

const RoomProvider = ({ children }: any) => {
    return <RoomContext.Provider value={{}}>{children}</RoomContext.Provider>;
};

export default RoomProvider;

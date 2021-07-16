import React from 'react';
import { Background } from './style';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

const AppContainer = ({ children }: Props) => {
    return <Background>{children}</Background>;
};

export default AppContainer;

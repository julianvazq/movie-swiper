import React from 'react';
import { Background, Container } from './style';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

const AppContainer = ({ children }: Props) => {
    return (
        <Background>
            <Container>{children}</Container>
        </Background>
    );
};

export default AppContainer;

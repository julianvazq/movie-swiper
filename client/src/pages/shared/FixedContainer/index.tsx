import React, { ReactNode } from 'react';
import { Container } from './style';

interface Props {
    children: ReactNode | ReactNode[];
}

const animation = {
    initial: {
        y: 75,
    },
    animate: {
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const FixedContainer = ({ children }: Props) => {
    return (
        <Container variants={animation} initial="initial" animate="animate">
            {children}
        </Container>
    );
};

export default FixedContainer;

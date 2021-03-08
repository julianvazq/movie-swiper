import React, { ReactNode } from 'react';
import { Container } from './style';

interface Props {
    position: string;
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

const FixedContainer = ({ position, children }: Props) => {
    return (
        <Container variants={animation} initial="initial" animate="animate" position={position}>
            {children}
        </Container>
    );
};

export default FixedContainer;

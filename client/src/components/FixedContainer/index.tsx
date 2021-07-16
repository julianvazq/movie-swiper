import React, { ReactNode } from 'react';
import { Container } from './style';

interface Props {
    position: string;
    children: ReactNode | ReactNode[];
}

const animation = {
    initial: {
        y: 75,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 1,
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

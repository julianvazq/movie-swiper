import React from 'react';
import { Container } from './style';
import { Subtitle, Title } from '../../../styles/index';

const Expired = () => {
    return (
        <Container>
            <Title>Not Found</Title>
            <Subtitle>Sorry, the room you&apos;re trying to join does not exist or has expired.</Subtitle>
        </Container>
    );
};

export default Expired;

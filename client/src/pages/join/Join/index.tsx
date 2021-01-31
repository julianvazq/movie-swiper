import React from 'react';
import { Subtitle, Title } from '../../../styles';
import JoinForm from '../JoinForm';
import { Container } from './style';

const Join = () => {
    return (
        <Container>
            <Title>Enter Your Name</Title>
            <Subtitle>Enter your name and a deck name before proceeding to movie selection.</Subtitle>
            <JoinForm />
        </Container>
    );
};

export default Join;

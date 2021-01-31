import React from 'react';
import { Subtitle, Title } from '../../../styles';
import Form from '../Form';
import { Container } from './style';

const Create = () => {
    return (
        <Container>
            <Title>Create New Movie Deck</Title>
            <Subtitle>Enter your name and a deck name before proceeding to movie selection.</Subtitle>
            <Form />
        </Container>
    );
};

export default Create;

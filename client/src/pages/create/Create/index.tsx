import React from 'react';
import { Subtitle, Title } from '../../../styles';
import CreateForm from '../CreateForm';
import { Container } from './style';

const Create = () => {
    return (
        <Container>
            <Title>Create New Group</Title>
            <Subtitle>Enter your name and a group name before proceeding to movie selection.</Subtitle>
            <CreateForm />
        </Container>
    );
};

export default Create;

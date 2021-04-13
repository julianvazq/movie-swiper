import React from 'react';
import { FormPageContainer, Subtitle, Title } from '../../../styles';
import CreateForm from '../CreateForm';

const Create = () => {
    return (
        <FormPageContainer>
            <Title>Create New Group</Title>
            <Subtitle>Enter your name and a group name before proceeding to movie selection.</Subtitle>
            <CreateForm />
        </FormPageContainer>
    );
};

export default Create;

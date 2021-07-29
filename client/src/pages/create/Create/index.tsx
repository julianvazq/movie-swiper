import React from 'react';
import { Helmet } from 'react-helmet';
import { FormPageContainer, Subtitle, Title } from '../../../styles';
import CreateForm from '../CreateForm';

const Create = () => {
    return (
        <FormPageContainer>
            <Helmet>
                <title>Create | Movie Swiper</title>
            </Helmet>
            <Title>Create New Room</Title>
            <Subtitle>Enter your name before proceeding to movie selection.</Subtitle>
            <CreateForm />
        </FormPageContainer>
    );
};

export default Create;

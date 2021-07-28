import React from 'react';
import { Helmet } from 'react-helmet';
import { FormPageContainer, Subtitle, Title } from '../../../styles';
import JoinForm from '../JoinForm';

const Join = () => {
    return (
        <FormPageContainer>
            <Helmet>
                <title>Join | Movie Swiper</title>
            </Helmet>
            <Title>Enter Your Name</Title>
            <Subtitle>Enter your name before proceeding to movie selection.</Subtitle>
            <JoinForm />
        </FormPageContainer>
    );
};

export default Join;

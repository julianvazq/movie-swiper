import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, MainTitle } from './style';

const Home = () => {
    const history = useHistory();
    const navigate = () => {
        history.push('/create');
    };
    return (
        <Container>
            <MainTitle>Landing Page</MainTitle>
            <button onClick={navigate}>Get Started</button>
        </Container>
    );
};

export default Home;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, MainTitle, Cursive, BR, GetStartedButton } from './style';

const Home = () => {
    const history = useHistory();
    const navigate = () => {
        history.push('/create');
    };
    return (
        <Container>
            <MainTitle>
                <span>
                    Find out <BR /> what you are
                </span>{' '}
                <Cursive>watching tonight</Cursive>
            </MainTitle>
            <GetStartedButton onClick={navigate}>Get Started</GetStartedButton>
        </Container>
    );
};

export default Home;

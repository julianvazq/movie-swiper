import React from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../../shared/Nav';
import Explainer from '../Explainer';
import { Bold, BR, Container, CTA, GetStartedButton, MainTitle, Subtitle } from './style';

const Home = () => {
    const history = useHistory();
    const navigate = () => {
        history.push('/create');
    };
    return (
        <>
            <Container>
                <Nav forceShow />
                <CTA>
                    {/* <MovieCardDisplay /> */}
                    <div>
                        <Subtitle>Undecided? Don&apos;t be</Subtitle>
                        <MainTitle>
                            Find out <BR /> what you are
                            <Bold>watching tonight</Bold>
                        </MainTitle>
                        <GetStartedButton onClick={navigate}>Get Started</GetStartedButton>
                    </div>
                </CTA>
            </Container>
            <Explainer />
        </>
    );
};

export default Home;

import React from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../../../components/Nav';
import Explainer from '../Explainer';
import { Bold, Container, CTA, GetStartedButton, MainTitle, Subtitle } from './style';

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
                        <MainTitle>
                            Movie night?
                            <Bold>Put it to a vote</Bold>
                        </MainTitle>
                        <Subtitle>Find the right movie</Subtitle>
                        <GetStartedButton onClick={navigate}>Get Started</GetStartedButton>
                    </div>
                </CTA>
            </Container>
            <Explainer />
        </>
    );
};

export default Home;

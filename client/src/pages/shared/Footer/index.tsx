import React from 'react';
import { Attribution, Container, InnerContainer, TheMovieDB } from './style';
import TheMovieDBLogo from '../../../assets/themoviedb-logo.svg';

const Footer = () => {
    return (
        <Container>
            <InnerContainer>
                <Attribution>
                    Powered by
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
                        <TheMovieDB src={TheMovieDBLogo} alt="The Movie DB." />
                    </a>
                </Attribution>
            </InnerContainer>
        </Container>
    );
};

export default Footer;

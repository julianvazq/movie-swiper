import React from 'react';
import { useLocation } from 'react-router';
import TheMovieDBLogo from '../../assets/themoviedb-logo.svg';
import { Stage } from '../../types/room';
import { Attribution, Container, InnerContainer, TheMovieDB } from './style';

const Footer = () => {
    const { pathname } = useLocation();
    const showFooter =
        pathname === '/' ||
        pathname.includes('/create') ||
        pathname.includes('/join') ||
        pathname.includes(Stage.RESULTS);

    return (
        <Container $display={showFooter}>
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

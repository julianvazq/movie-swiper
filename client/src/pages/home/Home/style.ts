import styled from 'styled-components';
import Cinema from '../../../assets/cinema.jpg';
import { Button } from '../../../styles';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 1rem;
    min-height: 100vh;
    position: relative;
    z-index: 1;

    @media (min-width: 1500px) {
        padding: 6rem 1rem;
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background-image: url(${Cinema});
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;

        @media (min-width: 700px) {
            background-position: 49% center;
        }
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`;

export const MainTitle = styled.h1`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    max-width: 650px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1.3;
    color: var(--white-muted);
    margin-bottom: 4rem;

    @media (min-width: 700px) {
        font-size: 2rem;
    }
`;

export const Cursive = styled.span`
    font-size: 2.5rem;
    font-family: 'Merienda One', cursive;
    color: var(--accent-light);

    @media (min-width: 700px) {
        font-size: 3rem;
    }
`;

export const BR = styled.br`
    display: inline;
    @media (min-width: 500px) {
        display: none;
    }
`;

export const GetStartedButton = styled(Button)`
    flex: 0;
    background: var(--accent-light);
    padding: 1rem 1.5rem;
    font-weight: 500;
    transition: background 100ms ease-in;

    &:hover {
        background: var(--accent-active);
    }
`;

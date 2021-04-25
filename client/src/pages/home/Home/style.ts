import styled from 'styled-components';
import Cinema from '../../../assets/movie-posters.jpg';
import { Button } from '../../../styles';

export const Container = styled.section`
    min-height: 100vh;
    position: relative;
    z-index: 1;
    overflow: hidden;

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
        background-position: top;
        background-repeat: no-repeat;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.65);
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`;

export const CTA = styled.section`
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 4rem 1.5rem;
    width: 90%;

    @media (min-width: 450px) {
        /* max-width: 500px; */
        margin: auto;
        justify-content: center;
    }

    @media (min-width: 1500px) {
        padding: 6rem 1rem;
    }
`;

export const MainTitle = styled.h1`
    display: flex;
    flex-direction: column;
    font-size: 2.5rem;
    max-width: 650px;
    letter-spacing: 1px;
    line-height: 1.2;
    color: #b3c4d8;
    margin: 0 0 4rem;
    font-weight: 500;

    @media (min-width: 700px) {
        font-size: 2.5rem;
    }
`;

export const Bold = styled.span`
    color: var(--white);
    font-weight: 700;
    font-size: 2.75rem;
`;

export const Subtitle = styled.h2`
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    color: #cecece6e;
    margin-bottom: 1rem;
    letter-spacing: 2px;
    margin-right: auto;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        height: 2px;
        background: #cecece33;
        width: 100%;
        bottom: -0.5rem;
        left: 0;
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
    background: var(--blue-action);
    padding: 1rem 3rem;
    font-weight: 500;
    transition: background 100ms ease-in;

    &:hover {
        background: var(--blue-action-90);
    }
`;

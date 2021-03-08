import styled from 'styled-components';

export const Container = styled.article`
    /* margin-bottom: 2.25rem; */
    max-height: 600px;
    height: 60vh;

    @media screen and (min-width: 600px) {
        height: auto;
    }
`;

export const Image = styled.img`
    display: block;
    max-width: 300px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
`;

import styled from 'styled-components';

export const Container = styled.article`
    height: 300px;
    width: 200px;
    background: gray;
    border-radius: 4px;
    z-index: -1;

    /* transform: rotate(18deg); */
    display: none;
    margin-right: 2rem;

    @media (min-width: 600px) {
        display: block;
    }
`;

export const Image = styled.img`
    display: block;
    object-fit: cover;
    height: 100%;
    width: 100%;
`;

export const ButtonSection = styled.div`
    padding: 1rem 1.5rem;
    background: var(--blue-active);
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
`;

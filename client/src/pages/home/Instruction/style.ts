import styled from 'styled-components';

export const Container = styled.article`
    padding: 1.5rem;
    background-color: var(--blue-active);
    border-radius: 4px;
    box-shadow: 0px 5px 15px 5px rgb(24 38 53 / 55%);
`;

export const Headline = styled.h3`
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--gray);
    font-weight: 400;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
`;

export const Body = styled.p`
    line-height: 1.5;
    @media screen and (min-width: 500px) {
        font-size: 1.125rem;
    }
`;

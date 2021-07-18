import styled from 'styled-components';

export const Container = styled.article`
    padding: 1.5rem;
    background-color: var(--blue-active);
    border-radius: 4px;
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
    font-size: 1.25rem;
    line-height: 1.5;
`;

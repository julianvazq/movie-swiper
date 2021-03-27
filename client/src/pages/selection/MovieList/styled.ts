import styled from 'styled-components';

export const List = styled.section`
    display: grid;
    gap: 2rem;
    margin-bottom: 4rem;

    & > *:not(:last-child) {
        padding-bottom: 2rem;
        border-bottom: 1px solid hsl(212deg 22% 43% / 38%);
    }

    @media screen and (min-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
    }
`;

export const Empty = styled.p`
    text-align: center;
`;

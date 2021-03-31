import styled from 'styled-components';

export const List = styled.section`
    display: grid;
    gap: 4rem;

    @media screen and (min-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const Empty = styled.p`
    text-align: center;
`;

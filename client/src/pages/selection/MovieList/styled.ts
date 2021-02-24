import styled from 'styled-components';

export const List = styled.section`
    display: grid;
    gap: 2rem;

    @media screen and (min-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
    }
`;

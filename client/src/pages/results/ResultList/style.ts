import styled from 'styled-components';

export const List = styled.section`
    display: grid;
    gap: 4rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

export const Empty = styled.p`
    text-align: center;
`;

import styled from 'styled-components';

export const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 0.5rem;

    & > * {
        min-height: 300px;
    }

    @media screen and (min-width: 700px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

        & > * {
            min-height: 300px;
        }
    }
`;

export const Empty = styled.p`
    text-align: center;
    margin: 4rem 0;

    @media (min-width: 700px) {
        font-size: 1.25rem;
    }
`;

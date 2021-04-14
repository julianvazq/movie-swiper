import styled from 'styled-components';

export const Container = styled.section<{ display: boolean }>`
    background: #141d26;
    padding: 2rem;
    display: ${(props) => (props.display ? 'block' : 'none')};

    @media (min-width: 600px) {
        display: block;
    }
`;

export const InnerContainer = styled.div`
    max-width: 1100px;
    margin: auto;
`;

export const TheMovieDB = styled.img`
    height: 11.5px;
    margin-left: 0.5rem;
`;

export const Attribution = styled.p`
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--white-muted);
    display: flex;
    align-items: center;
    justify-content: center;
`;

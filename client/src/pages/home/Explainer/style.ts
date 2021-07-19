import { FaFilm, FaPollH, FaUsers } from 'react-icons/fa';
import styled, { css } from 'styled-components';

export const Grid = styled.section`
    max-width: 1100px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 4rem 1.5rem;
    position: relative;
    z-index: 3;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        height: 2px;
        background: var(--blue-muted);
        width: 100%;
        bottom: -4rem;
        left: 0;
    }

    @media screen and (min-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
        margin-top: -5rem;
    }

    @media screen and (min-width: 1100px) {
        margin: -5rem auto 4rem auto;
    }
`;

const iconStyles = css`
    font-size: 1.25rem;
    margin-right: 0.75rem;
`;

export const UsersIcon = styled(FaUsers)`
    ${iconStyles}
    margin-right: 0.5rem;
`;

export const FilmIcon = styled(FaFilm)`
    ${iconStyles}
`;

export const PollIcon = styled(FaPollH)`
    ${iconStyles}
`;

import { FaFilm, FaPollH, FaUsers } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import { MaxWidthContainer } from '../../../styles';

export const Section = styled(MaxWidthContainer)`
    z-index: 1;
    position: relative;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > *:not(:last-of-type) {
        margin-bottom: 2rem;
    }
`;

export const MobileContainer = styled(Container)`
    max-width: 300px;
    margin: -13rem auto 0;
    padding: 4rem;
    background: hsl(211deg 28% 25% / 90%);
    border-radius: 4px;
`;

export const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Grid = styled.div`
    max-width: 1100px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 4rem 1.5rem;
    position: relative;
    z-index: 3;

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
    margin-right: 0.5rem;
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

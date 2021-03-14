import styled, { css } from 'styled-components';
import { Button } from '../../../styles';
import { RiCloseFill } from 'react-icons/ri';
import { HiHeart } from 'react-icons/hi';

export const LikeButton = styled(Button)`
    background: var(--blue-active);
    outline: none;
    border-radius: 0;

    @media screen and (min-width: 600px) {
        padding: 1rem 2rem;
        white-space: nowrap;
    }
`;

export const DislikeButton = styled(Button)`
    background: var(--red);
    outline: none;
    border-radius: 0;

    @media screen and (min-width: 600px) {
        padding: 1rem 2rem;
        white-space: nowrap;
    }
`;

const iconStyles = css`
    font-size: 1.5rem;
`;

export const LikeIcon = styled(HiHeart)`
    ${iconStyles}
    margin-right: 1rem;
`;

export const DislikeIcon = styled(RiCloseFill)`
    ${iconStyles}
    margin-right: 0.5rem;
`;

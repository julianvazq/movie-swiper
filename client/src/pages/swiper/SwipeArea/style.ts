import styled from 'styled-components';
import { Button } from '../../../styles';

export const LikeButton = styled(Button)`
    background: var(--blue-action);
    outline: none;
    border-radius: 0;

    @media screen and (min-width: 600px) {
        padding: 1rem 2rem;
        white-space: nowrap;
    }
`;

export const DislikeButton = styled(Button)`
    background: var(--blue-muted);
    outline: none;
    border-radius: 0;

    @media screen and (min-width: 600px) {
        padding: 1rem 2rem;
        white-space: nowrap;
    }
`;

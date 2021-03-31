import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Button } from '../../../styles';

export const Card = styled.article`
    /* max-height: 300px; */
    border-right: 1px solid var(--blue-dark);
    background: var(--blue-dark);
`;

export const ResultsArea = styled.div`
    display: flex;
`;

export const TotalLikes = styled.p`
    font-weight: 700;
    font-size: 2.25rem;
    text-align: center;
    padding: 0.5rem 1rem;
    background: hsl(213deg 45% 36% / 90%);

    span {
        font-size: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;

export const MovieTitle = styled.h3`
    font-weight: 400;
    padding: 1rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-align: center;
`;

export const Image = styled(motion.img)`
    height: 280px;
    object-fit: cover;
    display: block;
    border-radius: 4px;
`;

export const ResultsContainer = styled.div`
    width: 100%;
    background: var(--blue-dark);
`;

export const DetailButton = styled(Button)`
    background: var(--blue-active);
    width: 100%;
    padding: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

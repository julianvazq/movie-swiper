import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Card = styled.article`
    max-height: 300px;
`;

export const ResultsArea = styled.div`
    display: flex;
`;

export const Votes = styled.p`
    font-weight: 700;
    font-size: 2rem;
`;

export const MovieTitle = styled.h3`
    font-weight: 500;
`;

export const Image = styled(motion.img)`
    max-width: 40%;
    object-fit: cover;
    display: block;
    border-radius: 4px;
    margin-right: 1rem;

    @media screen and (min-width: 600px) {
        margin-right: 2rem;
    }
`;

export const ResultsContainer = styled.div``;

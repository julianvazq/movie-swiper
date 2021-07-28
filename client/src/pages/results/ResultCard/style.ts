import { motion } from 'framer-motion';
import { RiInformationLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Button } from '../../../styles';

export const Card = styled.article`
    border-right: 1px solid var(--blue-dark);
    border-radius: 4px;
    background: var(--blue-dark);
`;

export const ResultsArea = styled.div`
    display: flex;
    position: relative;
`;

export const ImageContainer = styled(motion.div)`
    position: relative;
`;

export const Image = styled(motion.img)`
    height: 230px;
    object-fit: cover;
    display: block;
    border-radius: 4px;
`;

export const TotalLikes = styled.p`
    font-weight: 600;
    font-size: 1.25rem;
    text-align: center;
    padding: 0.5rem 1rem;
    background: hsl(213deg 47% 48% / 90%);
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: baseline;
    border-radius: 4px;

    span {
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-left: 0.5rem;
    }
`;

export const MovieTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.3;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom: 1px solid var(--blue-active);
    padding-bottom: 0.75rem;
`;

export const ResultsContainer = styled.div`
    width: 100%;
    background: var(--blue-dark);
    padding: 1rem 1.5rem;
`;

export const DetailButton = styled(Button)`
    background: var(--blue-active);
    width: 100%;
    padding: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

export const ExpandIcon = styled(RiInformationLine)`
    font-size: 1rem;
    margin-right: 0.5rem;
`;

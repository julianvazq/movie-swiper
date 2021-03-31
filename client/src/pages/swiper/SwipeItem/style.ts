import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Button } from '../../../styles';
import { RiInformationLine } from 'react-icons/ri';

export const Container = styled.article`
    margin: auto;
    margin-bottom: 2.5rem;
    max-width: 600px;
    max-width: 350px;

    @media screen and (min-width: 600px) {
        height: auto;
    }
`;

export const Image = styled(motion.img)`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
`;

export const Title = styled(motion.h3)`
    font-size: 1.25rem;
    padding: 1.5rem 1rem 1rem;
    border-radius: 4px;
    margin-top: auto;
    font-weight: 500;
    text-align: center;
    line-height: 1.3;
    width: 100%;
    text-transform: none;
    background: var(--blue-dark);
`;

export const PreviewButton = styled(Button)`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    background: hsl(211deg 43% 10%);
    color: var(--white-muted);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

export const Details = styled.p`
    width: 100%;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    background: #2e3f52;
    padding: 1rem;
`;

export const ExpandIcon = styled(RiInformationLine)`
    font-size: 1rem;
    margin-right: 0.5rem;
`;

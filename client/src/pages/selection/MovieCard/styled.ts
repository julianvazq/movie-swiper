import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Card = styled(motion.button)<{ zIndex: number }>`
    border-radius: 4px;
    cursor: pointer;
    z-index: ${(props) => props.zIndex || 0};

    &:focus {
        outline: none;
    }
`;

export const ContentContainer = styled(motion.div)`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

export const Image = styled(motion.img)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
`;

export const Title = styled(motion.h3)`
    width: 100%;
    padding: 1rem;
    margin-top: auto;
    font-weight: 500;
    text-align: center;
    line-height: 1.3;
    background: #00000038;
    background: linear-gradient(180deg, rgba(247, 245, 252, 0) -10%, rgba(0, 0, 0, 1) 100%);
`;

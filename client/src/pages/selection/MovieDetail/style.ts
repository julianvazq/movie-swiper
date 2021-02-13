import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.section)<{ imageUrl?: string | null }>`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    /* left: 50%;
    transform: translateX(-50px); */
    will-change: opacity;
    z-index: 1;
    overflow: hidden;
`;

export const Background = styled(motion.div)<{ imageUrl: string | null }>`
    background: linear-gradient(to top, hsla(0, 0%, 0%, 0.25) 0%, hsla(0, 0%, 0%, 0) 100%),
        url(${(props) => props.imageUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
`;

export const Title = styled(motion.h3)``;

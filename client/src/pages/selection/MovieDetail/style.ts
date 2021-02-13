import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
    will-change: opacity;
`;

export const Container = styled(motion.section)<{ imageUrl?: string | null }>`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    will-change: opacity;
    z-index: 2;
    overflow: hidden;

    @media screen and (min-width: 700px) {
        max-width: 800px;
        max-height: 500px;
        left: 0;
        right: 0;
        margin: auto;
        background: pink;
        padding: 1rem;
        border-radius: 4px;
    }
`;

export const ContentContainer = styled(motion.div)<{ imageUrl: string | null }>`
    background: linear-gradient(to top, hsla(0, 0%, 0%, 0.25) 0%, hsla(0, 0%, 0%, 0) 100%),
        url(${(props) => props.imageUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;

    @media screen and (min-width: 700px) {
        width: 200px;
    }
`;

export const Title = styled(motion.h3)``;

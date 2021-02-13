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
    background: rgba(0, 0, 0, 0);
    will-change: opacity;
    z-index: 3;

    @media screen and (min-width: 700px) {
        background: rgba(0, 0, 0, 0.8);
    }
`;

export const Container = styled(motion.section)<{ imageUrl?: string | null }>`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    will-change: opacity;
    overflow: hidden;
    z-index: 4;

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
    filter: brightness(0.5);
    z-index: -1;

    @media screen and (min-width: 700px) {
        width: 200px;
    }
`;

export const ContentContainer = styled(motion.div)<{ imageUrl: string | null }>`
    /* background: linear-gradient(to top, hsla(0, 0%, 0%, 0.25) 0%, hsla(0, 0%, 0%, 0) 100%),
        url(${(props) => props.imageUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center; */
    height: 100%;
    width: 100%;
    position: relative;
`;

export const Title = styled(motion.h3)``;

export const BackButtonContainer = styled.div`
    padding: 1rem;
    background: pink;
    margin-top: auto;
`;

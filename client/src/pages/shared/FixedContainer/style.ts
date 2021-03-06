import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: -3px;
    display: flex;
    box-shadow: 0 -2px 10px -1px rgb(0 0 0 / 30%);
    width: 100%;
    z-index: 4;

    @media screen and (min-width: 600px) {
        margin: auto;
        width: fit-content;
        bottom: 1rem;
    }
`;

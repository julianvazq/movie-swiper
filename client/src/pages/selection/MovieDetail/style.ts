import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.section)<{ imageUrl: string | null }>`
    background: linear-gradient(to top, hsla(0, 0%, 0%, 0.25) 0%, hsla(0, 0%, 0%, 0) 100%),
        url(${(props) => props.imageUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
`;

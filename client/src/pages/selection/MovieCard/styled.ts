import { motion } from 'framer-motion';
import styled from 'styled-components';
import PosterUnavailable from '../../../assets/poster_unavailable.png';

export const Card = styled(motion.button)`
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;

    &:focus {
        outline: none;
    }
`;

export const Background = styled(motion.div)<{ imageUrl: string | null }>`
    background: linear-gradient(to top, hsla(0, 0%, 0%, 0.25) 0%, hsla(0, 0%, 0%, 0) 100%),
        url(${(props) => (props.imageUrl ? props.imageUrl : PosterUnavailable)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

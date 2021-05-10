import { motion } from 'framer-motion';
import { HiMinus, HiOutlinePlus } from 'react-icons/hi';
import styled from 'styled-components';

export const Container = styled.article`
    position: relative;
    border-radius: 4px;
    height: 100%;
`;

export const Card = styled(motion.button)<{ zIndex: number }>`
    height: 100% !important;
    width: 100%;
    cursor: pointer;
    z-index: ${(props) => props.zIndex || 0};

    &:focus {
        outline: none;
    }

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(
            to bottom,
            hsla(0, 0%, 0%, 0) 0%,
            hsla(0, 0%, 0%, 0.041) 7%,
            hsla(0, 0%, 0%, 0.082) 13.5%,
            hsla(0, 0%, 0%, 0.124) 19.4%,
            hsla(0, 0%, 0%, 0.166) 25%,
            hsla(0, 0%, 0%, 0.208) 30.4%,
            hsla(0, 0%, 0%, 0.251) 35.6%,
            hsla(0, 0%, 0%, 0.295) 40.9%,
            hsla(0, 0%, 0%, 0.339) 46.4%,
            hsla(0, 0%, 0%, 0.385) 52.1%,
            hsla(0, 0%, 0%, 0.431) 58.3%,
            hsla(0, 0%, 0%, 0.479) 65%,
            hsla(0, 0%, 0%, 0.527) 72.4%,
            hsla(0, 0%, 0%, 0.577) 80.6%,
            hsla(0, 0%, 0%, 0.628) 89.8%,
            hsla(0, 0%, 0%, 0.68) 100%
        );
        z-index: 1;
    }
`;

export const ContentContainer = styled(motion.div)`
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Image = styled(motion.img)`
    border-radius: 4px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
    z-index: 0;
`;

export const Title = styled(motion.h3)`
    border-radius: 4px;
    width: 100%;
    padding: 1rem;
    margin-top: auto;
    font-weight: 500;
    text-align: center;
    line-height: 1.3;
    background: #00000038;
    background: linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0.007) 7.9%,
        hsla(0, 0%, 0%, 0.028) 15%,
        hsla(0, 0%, 0%, 0.062) 21.4%,
        hsla(0, 0%, 0%, 0.105) 27.3%,
        hsla(0, 0%, 0%, 0.158) 32.8%,
        hsla(0, 0%, 0%, 0.218) 38.1%,
        hsla(0, 0%, 0%, 0.284) 43.3%,
        hsla(0, 0%, 0%, 0.354) 48.5%,
        hsla(0, 0%, 0%, 0.427) 54%,
        hsla(0, 0%, 0%, 0.5) 59.9%,
        hsla(0, 0%, 0%, 0.574) 66.2%,
        hsla(0, 0%, 0%, 0.645) 73.3%,
        hsla(0, 0%, 0%, 0.712) 81.2%,
        hsla(0, 0%, 0%, 0.775) 90%,
        hsla(0, 0%, 0%, 0.83) 100%
    );
    z-index: 1;
`;

export const ButtonContainer = styled.button<{ backgroundColor: string }>`
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.backgroundColor || '#4c7fbd'};
    border-radius: 50%;
    padding: 0.25rem;
    box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
    cursor: pointer;
    z-index: 2;
`;

export const PlusIcon = styled(HiOutlinePlus)`
    font-size: 2rem;
`;

export const MinusIcon = styled(HiMinus)`
    font-size: 2rem;
`;

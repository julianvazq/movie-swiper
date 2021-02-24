import { motion } from 'framer-motion';
import styled from 'styled-components';
import { HiOutlinePlus, HiMinus } from 'react-icons/hi';

export const Container = styled.article`
    position: relative;
    border-radius: 4px;
`;

export const Card = styled(motion.button)<{ zIndex: number }>`
    height: 100%;
    width: 100%;
    cursor: pointer;
    z-index: ${(props) => props.zIndex || 0};

    &:focus {
        outline: none;
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
    background: linear-gradient(180deg, rgba(247, 245, 252, 0) -10%, rgba(0, 0, 0, 1) 100%);
    z-index: 1;
`;

export const ButtonContainer = styled.button<{ backgroundColor: string }>`
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.backgroundColor || '#4c7fbd'};
    border-radius: 50%;
    padding: 0.25rem;
    box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
    cursor: pointer;
`;

export const PlusIcon = styled(HiOutlinePlus)`
    font-size: 2rem;
`;

export const MinusIcon = styled(HiMinus)`
    font-size: 2rem;
`;

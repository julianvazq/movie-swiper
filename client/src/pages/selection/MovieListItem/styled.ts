import { Button } from './../../../styles/index';
import { Genre } from './../MovieDetail/style';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HiOutlinePlus, HiMinus } from 'react-icons/hi';

export const Item = styled.article`
    display: flex;
    position: relative;
    padding-bottom: 2rem;
    height: 250px;
    border-bottom: 1px solid hsl(212deg 22% 43% / 38%);

    &:last-of-type {
        border: none;
    }

    @media screen and (min-width: 800px) {
        height: 300px;
    }
`;

export const Image = styled(motion.img)`
    width: 30%;
    object-fit: cover;
    display: block;
    border-radius: 4px;
    margin-right: 1rem;

    @media screen and (min-width: 600px) {
        margin-right: 2rem;
    }
`;

export const InfoContainer = styled.article`
    overflow: hidden;
    position: relative;

    &:after {
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
            hsla(210, 38%, 15%, 0) 0%,
            hsla(210, 38%, 15%, 0.106) 8.1%,
            hsla(210, 38%, 15%, 0.2) 14.7%,
            hsla(210, 38%, 15%, 0.284) 20%,
            hsla(210, 38%, 15%, 0.358) 24.4%,
            hsla(210, 38%, 15%, 0.426) 28.1%,
            hsla(210, 38%, 15%, 0.487) 31.6%,
            hsla(210, 38%, 15%, 0.544) 35.1%,
            hsla(210, 38%, 15%, 0.598) 38.8%,
            hsla(210, 38%, 15%, 0.649) 43.2%,
            hsla(210, 38%, 15%, 0.701) 48.5%,
            hsla(210, 38%, 15%, 0.753) 55.1%,
            hsla(210, 38%, 15%, 0.808) 63.2%,
            hsla(210, 38%, 15%, 0.866) 73.2%,
            hsla(210, 38%, 15%, 0.93) 85.3%,
            hsl(210, 38%, 15%) 100%
        );
    }
`;

export const Title = styled.h3`
    font-size: 1.25rem;
    margin-bottom: 0.5rem;

    @media screen and (min-width: 800px) {
        font-size: 2rem;
    }
`;
export const GenreContainer = styled.div`
    display: flex;
    margin-bottom: 0.5rem;

    @media screen and (min-width: 800px) {
        margin-bottom: 1rem;
    }
`;

export const SmallGenre = styled(Genre)`
    font-size: 0.875rem;
    margin-right: 0.5rem;

    @media screen and (min-width: 800px) {
        font-size: 1rem;
        margin-right: 1rem;
    }
`;

export const Overview = styled.p`
    line-height: 1.3;
`;

export const SeeMoreButton = styled(Button)`
    font-size: 1.125rem;
    width: 100%;
    padding: 0.5rem 1rem;
    background: #445970;
    position: absolute;
    bottom: 0rem;
    left: 0;
    right: 0;
    margin: auto;
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

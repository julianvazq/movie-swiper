import { motion } from 'framer-motion';
import { HiMinus, HiOutlinePlus } from 'react-icons/hi';
import { RiInformationLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Button } from './../../../styles/index';
import { Genre } from './../MovieDetail/style';

export const Item = styled.article`
    display: flex;
    position: relative;
    height: 250px;
    cursor: pointer;

    @media screen and (min-width: 800px) {
        height: 300px;
    }
`;

export const Image = styled(motion.img)`
    max-width: 30%;
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
            to top,
            hsl(210, 38%, 15%) 0%,
            hsla(210, 38%, 15%, 0.941) 25%,
            hsla(210, 38%, 15%, 0.881) 28%,
            hsla(210, 38%, 15%, 0.819) 32%,
            hsla(210, 38%, 15%, 0.756) 36%,
            hsla(210, 38%, 15%, 0.692) 41.3%,
            hsla(210, 38%, 15%, 0.626) 45.7%,
            hsla(210, 38%, 15%, 0.56) 49.6%,
            hsla(210, 38%, 15%, 0.492) 53.3%,
            hsla(210, 38%, 15%, 0.424) 57.2%,
            hsla(210, 38%, 15%, 0.355) 61.4%,
            hsla(210, 38%, 15%, 0.285) 66.4%,
            hsla(210, 38%, 15%, 0.214) 72.4%,
            hsla(210, 38%, 15%, 0.143) 79.8%,
            hsla(210, 38%, 15%, 0.072) 88.9%,
            hsla(210, 38%, 15%, 0) 100%
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
    position: relative;

    /* &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(
            to top,
            hsl(210, 38%, 15%) 0%,
            hsla(210, 38%, 15%, 1) 18.7%,
            hsla(210, 38%, 15%, 1) 34.8%,
            hsla(210, 38%, 15%, 1) 48.6%,
            hsla(210, 38%, 15%, 1) 60.3%,
            hsla(210, 38%, 15%, 1) 69.9%,
            hsla(210, 38%, 15%, 0.626) 77.8%,
            hsla(210, 38%, 15%, 0.562) 84.1%,
            hsla(210, 38%, 15%, 0.497) 89%,
            hsla(210, 38%, 15%, 0.431) 92.7%,
            hsla(210, 38%, 15%, 0.364) 95.4%,
            hsla(210, 38%, 15%, 0.295) 97.2%,
            hsla(210, 38%, 15%, 0.224) 98.4%,
            hsla(210, 38%, 15%, 0.151) 99.2%,
            hsla(210, 38%, 15%, 0.077) 99.6%,
            hsla(210, 38%, 15%, 0) 100%
        );

        linear-gradient(
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
    } */
`;

export const SeeMoreButton = styled(Button)`
    font-size: 1rem;
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

export const InfoIcon = styled(RiInformationLine)`
    font-size: 1.125rem;
    margin-right: 0.5rem;
`;

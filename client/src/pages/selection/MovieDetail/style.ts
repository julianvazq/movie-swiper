import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { HiOutlinePlus, HiMinus } from 'react-icons/hi';
import { Button } from '../../../styles';

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
    z-index: 6;

    @media screen and (min-width: 600px) {
        background: rgba(0, 0, 0, 0.5);
    }
`;

export const Container = styled(motion.section)<{ imageUrl?: string | null }>`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    will-change: opacity;
    z-index: 7;
    overflow-y: scroll;

    @media screen and (min-width: 600px) {
        max-width: 800px;
        max-height: 500px;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.5);
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
    filter: brightness(0.25);
    z-index: -1;
`;

export const ContentContainer = styled(motion.article)`
    height: auto;
    min-height: 100%;
    width: 100%;
    position: relative;
    padding: 2rem 2rem 6rem;

    @media screen and (min-width: 600px) {
        max-width: 800px;
        max-height: 500px;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        padding: 3rem;
    }
`;

export const Title = styled(motion.h3)`
    font-size: 3rem;
    margin-bottom: 0.5rem;
`;

export const Tag = styled.p`
    margin-bottom: 1rem;
`;

export const WrapContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    & > * {
        margin-top: 0.5rem;
        margin-right: 0.5rem;
    }
`;

export const Genre = styled.p`
    background: #495768;
    color: var(--white);
    padding: 0.125rem 0.75rem;
    border-radius: 99px;
`;

export const Overview = styled.p`
    line-height: 1.5;
    margin-bottom: 2rem;
`;

export const Label = styled.p`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

export const Divider = styled.p`
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    color: #e3e3e3;
    border-bottom: 1px solid;
    font-size: 0.875rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-gap: 1rem;
    margin-bottom: 2rem;

    @media screen and (min-width: 350px) {
        grid-template-columns: repeat(2, minmax(130px, 200px));
    }
`;

export const GridCell = styled.div`
    p {
        display: flex;
    }
`;

export const Star = styled(AiFillStar)`
    margin-left: 0.5rem;
    color: #dada1b;
`;

export const Video = styled.iframe`
    width: 100%;

    @media screen and (min-width: 450px) {
        height: 275px;
    }

    @media screen and (min-width: 600px) {
        height: 500px;
        margin-bottom: 3rem;
    }
`;

export const ButtonContainer = styled(motion.div)`
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: hsl(213deg 23% 25%);
    box-shadow: 0 -2px 10px -1px rgb(0 0 0 / 30%);
    margin-top: auto;

    @media screen and (min-width: 600px) {
        display: none;
    }
`;

export const BackButton = styled(Button)``;

export const AddButton = styled(Button)<{ backgroundColor: string }>`
    background: ${(props) => props.backgroundColor || 'var(--blue-action)'};
`;

const iconStyles = css`
    margin-right: 1rem;
    font-size: 1.125rem;
`;

export const BackIcon = styled(IoIosArrowBack)`
    ${iconStyles}
`;

export const PlusIcon = styled(HiOutlinePlus)`
    ${iconStyles}
`;

export const MinusIcon = styled(HiMinus)`
    ${iconStyles}
`;

export const DesktopAddButton = styled(Button)<{ backgroundColor: string }>`
    display: none;
    max-width: 300px;
    background: ${(props) => props.backgroundColor || 'var(--blue-action)'};
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-bottom: 2rem;

    @media screen and (min-width: 600px) {
        display: flex;
    }
`;

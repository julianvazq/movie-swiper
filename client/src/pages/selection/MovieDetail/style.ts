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
    z-index: 4;
    overflow-y: scroll;

    @media screen and (min-width: 700px) {
        max-width: 800px;
        max-height: 500px;
        left: 0;
        right: 0;
        margin: auto;
        background: pink;
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

    @media screen and (min-width: 700px) {
        position: static;
        width: 200px;
        filter: none;
    }
`;

export const ContentContainer = styled(motion.article)`
    height: auto;
    min-height: 100%;
    width: 100%;
    position: relative;
    padding: 2rem;

    @media screen and (min-width: 700px) {
        display: flex;
    }
`;

export const Title = styled(motion.h3)`
    font-size: 3rem;
    margin-bottom: 0.5rem;
`;

export const Tag = styled.p`
    margin-bottom: 0.5rem;
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
    background: black;
    border: 0.5px solid var(--white);
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
    grid-template-columns: repeat(auto-fill, minmax(130px, auto));
    grid-gap: 1rem;
    margin-bottom: 2rem;
`;

export const GridCell = styled.div``;

export const BackButtonContainer = styled.div`
    padding: 1rem;
    background: pink;
    margin-top: auto;
`;

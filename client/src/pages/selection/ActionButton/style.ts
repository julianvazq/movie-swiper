import { Button } from '../../../styles/index';
import styled, { css } from 'styled-components';
import { RiCheckboxCircleFill, RiCheckboxCircleLine, RiMovieFill } from 'react-icons/ri';
import { SiTinder } from 'react-icons/si';

export const FixedContainer = styled.div`
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
        width: 300px;
        bottom: 1rem;
    }
`;

export const MainButton = styled(Button)`
    flex: 70%;
    background: var(--blue-muted);
    outline: none;
    border-radius: 0;
`;

export const ReadyButton = styled(Button)`
    flex: 30%;
    background: pink;
    outline: none;
    border-radius: 0;
`;

const iconStyles = css`
    font-size: 1.5rem;
    margin-right: 1rem;
`;

export const FillCheckbox = styled(RiCheckboxCircleFill)`
    ${iconStyles}
`;
export const EmptyCheckbox = styled(RiCheckboxCircleLine)`
    ${iconStyles}
`;

export const TinderIcon = styled(SiTinder)`
    ${iconStyles}
`;
export const PlayIcon = styled(RiMovieFill)`
    ${iconStyles}
`;

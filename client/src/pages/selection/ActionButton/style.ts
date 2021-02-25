import { Button } from '../../../styles/index';
import styled, { css } from 'styled-components';
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from 'react-icons/ri';
import { SiTinder } from 'react-icons/si';

export const FixedButton = styled(Button)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background: var(--blue-muted);
    box-shadow: 0 -2px 10px -1px rgb(0 0 0 / 30%);
    width: 100%;
    z-index: 3;
    outline: none;

    @media screen and (min-width: 600px) {
        margin: auto;
    }
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

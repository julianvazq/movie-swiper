import { Button } from '../../../styles/index';
import styled, { css } from 'styled-components';
import { RiCheckboxCircleFill, RiCheckboxCircleLine, RiMovieFill } from 'react-icons/ri';
import { SiTinder } from 'react-icons/si';
import { FaUserCheck } from 'react-icons/fa';

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
        width: fit-content;
        bottom: 1rem;
    }
`;

export const MainButton = styled(Button)`
    flex: 70%;
    background: var(--blue-muted);
    outline: none;
    border-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    @media screen and (min-width: 600px) {
        padding: 1rem 2rem;
        white-space: nowrap;
    }
`;

export const ReadyButton = styled(Button)`
    flex: 30%;
    background: var(--blue-dark-bg);
    outline: none;
    border-radius: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
`;

const iconStyles = css`
    font-size: 1.5rem;
    margin-right: 1rem;
`;

export const UserCheck = styled(FaUserCheck)`
    ${iconStyles}
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
    color: hsl(213deg 19% 50%);
`;

export const NoParticipants = styled.p`
    margin-bottom: 1rem;
`;

export const ModalContent = styled.div`
    padding: 0 1rem;
    h2 {
        font-weight: 500;
        margin-bottom: 1rem;
    }

    ul {
        margin-bottom: 2rem;
        & > * + * {
            margin-top: 1rem;
        }
    }

    li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.25rem;

        div {
            display: flex;
            align-items: center;
        }

        p {
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.875rem;
            color: var(--white-muted);
        }
    }
`;

import { FaCrown, FaUserAlt, FaUserCheck } from 'react-icons/fa';
import { RiCheckboxCircleFill, RiCheckboxCircleLine, RiMovieFill } from 'react-icons/ri';
import { SiTinder } from 'react-icons/si';
import styled, { css } from 'styled-components';
import { Button } from '../../../styles/index';

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

const iconStyles = css`
    font-size: 1.25rem;
    margin-right: 1rem;
    width: 20px;
`;

export const UserCheck = styled(FaUserCheck)`
    ${iconStyles}
    margin-right: 0.5rem;
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

export const CrownIcon = styled(FaCrown)`
    ${iconStyles}
`;

export const UserIcon = styled(FaUserAlt)`
    ${iconStyles}
    font-size: 1rem;
`;

export const MainButton = styled(Button)<{ disable?: boolean }>`
    background: ${(props) => (props.disable ? '#565656' : 'var(--accent-purple)')};
    color: ${(props) => (props.disable ? '#a9a9a9' : 'var(--white)')};
    transition: all ease-in 250ms;
    flex: 70%;
    outline: none;
    border-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    & ${PlayIcon} {
        transition: all ease-in 250ms;
        color: ${(props) => props.disable && '#a9a9a9'};
    }

    @media screen and (min-width: 600px) {
        padding: 1rem 2rem;
        white-space: nowrap;
    }
`;

export const ToggleReadyButton = styled(MainButton)`
    background: var(--blue-active);
`;

export const ReadyButton = styled(Button)`
    flex: 30%;
    background: var(--blue-dark-bg);
    outline: none;
    border-radius: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    span {
        width: 20px;
    }
`;

export const NoParticipants = styled.p`
    margin-bottom: 1rem;
    color: var(--white-muted);
`;

export const ModalContent = styled.div`
    padding: 0 1rem;
    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
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
        font-size: 1.125rem;

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

export const ReadyText = styled.p`
    line-height: 1.3;
    margin-bottom: 2rem;
`;

export const StartButton = styled(Button)`
    background: var(--accent-purple);
    padding: 0.75rem 1rem;
    width: 100%;
    margin-top: 2rem;
`;

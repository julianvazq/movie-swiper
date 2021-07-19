import { RiInformationLine } from 'react-icons/ri';
import styled from 'styled-components';

export const Button = styled.button`
    width: 225px;
    padding: 1rem 1rem 0;
    border-radius: 4px;
    cursor: pointer;
    background-color: var(--blue-active);
    display: flex;
    flex-direction: column;
`;

export const Image = styled.img`
    display: block;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 4px;
`;

export const ButtonSection = styled.div`
    padding: 1rem 0;
    background: var(--blue-active);
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    border-radius: 0 0 4px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const InfoIcon = styled(RiInformationLine)`
    font-size: 1.25rem;
    margin-right: 0.5rem;
`;

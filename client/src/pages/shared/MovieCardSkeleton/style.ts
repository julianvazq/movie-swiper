import { HiOutlinePlus } from 'react-icons/hi';
import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 4px;
    background: var(--blue-active);
    position: relative;
`;

export const ButtonContainer = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: hsl(213deg 40% 49%);
    border-radius: 50%;
    padding: 0.25rem;
    box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
    cursor: pointer;
`;

export const PlusIcon = styled(HiOutlinePlus)`
    font-size: 2rem;
`;

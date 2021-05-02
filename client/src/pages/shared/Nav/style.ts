import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { Button } from '../../../styles';

export const Container = styled.section`
    /* background: #141d26; */
    background: rgb(0 0 0 / 25%);
    padding: 1.5rem;
`;

export const InnerContainer = styled.div`
    max-width: 1100px;
    margin: auto;
    display: flex;
    justify-content: space-between;
`;

export const Logo = styled.div`
    color: var(--white);
    font-size: 1.25rem;
    font-family: 'Merienda One', cursive;
`;

export const NavContainer = styled.section``;

export const NavLinks = styled.nav`
    display: flex;
    align-items: center;
    list-style: none;

    & > *:not(:last-child) {
        margin: 0 1rem;
    }
`;

export const UserButton = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const UserIcon = styled(FaUserCircle)`
    font-size: 1.25rem;
    margin-left: 0.75rem;
    width: 20px;
`;

export const ModalContent = styled.section`
    padding: 0 1rem;

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
    }
`;

export const CurrentName = styled.p`
    color: var(--white-muted);
    margin-bottom: 0.5rem;
`;

export const Name = styled.p`
    margin-bottom: 1rem;
    font-size: 1.125rem;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const ChangeButton = styled(Button)`
    background: var(--blue-action);
    padding: 0.75rem 1rem;
`;

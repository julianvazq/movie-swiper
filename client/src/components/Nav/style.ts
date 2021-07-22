import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../styles';

export const Container = styled.nav`
    background: rgb(0 0 0 / 25%);
    padding: 1rem;

    @media screen and (min-width: 700px) {
        padding: 1.5rem 1rem;
    }
`;

export const InnerContainer = styled.div`
    max-width: 1100px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled.div`
    color: var(--white);
    font-size: 1.25rem;
    font-family: 'Merienda One', 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

export const NavContainer = styled.section``;

export const NavLinks = styled.div`
    display: flex;
    align-items: center;
    list-style: none;

    & > *:not(:last-child) {
        margin-right: 0.75rem;
    }

    @media screen and (min-width: 450px) {
        & > *:not(:last-child) {
            margin-right: 1.5rem;
        }
    }
`;

export const StyledLink = styled(NavLink)<{ $active: boolean }>`
    font-weight: ${(props) => props.$active && 700};
`;

export const UserButton = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
        margin-right: 0.75rem;
    }
`;

export const UserIcon = styled(FaUserCircle)`
    font-size: 1.25rem;
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

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const ChangeButton = styled(Button)`
    background: var(--blue-action);
    padding: 0.75rem 1rem;
    width: 100%;
`;

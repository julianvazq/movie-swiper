import styled from 'styled-components';

export const Container = styled.section`
    background: #141d26;
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

export const NavContainer = styled.nav``;

export const NavLinks = styled.ul`
    display: flex;
    list-style: none;
`;

export const Link = styled.li`
    &:not(:last-child) {
        margin: 0 0.75rem;
    }
`;

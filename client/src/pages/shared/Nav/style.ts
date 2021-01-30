import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    justify-content: space-between;
    background: #141d26;
    padding: 1rem;
`;

export const Logo = styled.div`
    color: var(--white);
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
